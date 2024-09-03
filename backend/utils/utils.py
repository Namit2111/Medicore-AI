from googlesearch import search
import wordfreq as wf
import re
from .gemini import generate_json_content
import os 
script_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(script_dir)
def get_prompt(filename):
    """
    reads a prompt from a file and returns it

    parameters:
    filename (str): filename of the prompt

    returns:
    str: the prompt
    """
    prompts_dir = os.path.join(parent_dir, 'prompts')
    file_path = os.path.join(prompts_dir, filename)
    with open(file_path, 'r') as file:
        prompt = file.read()
    
    return prompt



def search_google(query,num_results=10, lang="en"):
    """
    find links on google 

    parameters:
    query (str): search query , num_results (int) : number of results, lang (str) : language

    returns:
    list of links
    """
    return search(query, num_results=num_results, lang=lang)



def calculate_keyword_weights(keywords):
    """
    Calculate the weights of keywords and phrases based on their Zipf frequency.
    
    Parameters:
    keywords (list): A list of keywords and phrases.
    
    Returns:
    dict: A dictionary of keywords/phrases and their corresponding weights.
    """
    keyword_weights = {}

    for keyword in keywords:

        zipf = wf.zipf_frequency(keyword, "en")
        weight = max(0, int((8 - zipf)))

        if weight > 0:
            keyword_weights[keyword] = weight
            print(f"Keyword/Phrase: '{keyword}' | Zipf: {zipf:.2f} | Weight: {weight}")


    for keyword in keywords:
        subwds = keyword.split(" ")
        if len(subwds) > 1 and keyword in keyword_weights:
            for subwd in subwds:
              
                if subwd not in keyword_weights:
                    sub_z = wf.zipf_frequency(subwd, "en")
                    sub_wgt = max(0, int((8 - sub_z) * 1 / 2))

                    if sub_wgt > 0:
                        keyword_weights[subwd] = sub_wgt
                        print(f"  Subword: '{subwd}' | Zipf: {sub_z:.2f} | Weight: {sub_wgt}")
    
    return keyword_weights


def llm_query(query):
    """
    rewrites user query with llm

    parameters:
    query (str): user query

    returns:
    llm_query_json (json): json of llm query
    """
    prompt = get_prompt(filename = "llm_query.txt").replace("{query}", query)
    llm_query_json = generate_json_content(prompt)   
    return llm_query_json



