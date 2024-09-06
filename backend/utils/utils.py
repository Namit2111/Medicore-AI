from googlesearch import search
import wordfreq as wf
import re
from utils.gemini import generate_json_content,generate_content
import os 
import requests
from bs4 import BeautifulSoup
script_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(script_dir)



# -------------------------Decorator-------------------------



def time_it(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time} seconds to execute.")
        return result
    return wrapper






# -------------------------------------------------------------

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



def search_google(query,num_results=10, lang="en",advanced=False):
    """
    find links on google 

    parameters:
    query (str): search query , num_results (int) : number of results, lang (str) : language, advanced (bool) : advanced search

    returns:
    list of links
    """
    return search(query, num_results=num_results, lang=lang,advanced= advanced)


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
            # print(f"Keyword/Phrase: '{keyword}' | Zipf: {zipf:.2f} | Weight: {weight}")


    for keyword in keywords:
        subwds = keyword.split(" ")
        if len(subwds) > 1 and keyword in keyword_weights:
            for subwd in subwds:
              
                if subwd not in keyword_weights:
                    sub_z = wf.zipf_frequency(subwd, "en")
                    sub_wgt = max(0, int((8 - sub_z) * 1 / 2))

                    if sub_wgt > 0:
                        keyword_weights[subwd] = sub_wgt
                        # print(f"  Subword: '{subwd}' | Zipf: {sub_z:.2f} | Weight: {sub_wgt}")
    
    return keyword_weights

def rate_text_based_on_keywords(text, keyword_weights):
    """
    Rate a text based on the weights of the keywords found in it and apply a penalty for missing keywords.
    
    Parameters:
    text (str): The text to be rated.
    keyword_weights (dict): A dictionary of keywords/phrases and their corresponding weights.
    
    Returns:
    float: The overall rating of the text.
    """
    
    total_weight = 0
    matched_keywords_count = 0
    missing_weight_penalty = 0
    
    words = text.split()
    

    for keyword, weight in keyword_weights.items():
        if keyword in words:
            
            total_weight += weight * words.count(keyword)
            matched_keywords_count += 1
        else:
           
            missing_weight_penalty += weight * 0.3
    
    if matched_keywords_count > 0:
        score = (total_weight - missing_weight_penalty) / len(keyword_weights)
    else:
        score = -missing_weight_penalty
    
    rating = max(0, score)
    
    # print(f"Total Weight: {total_weight} | Missing Penalty: {missing_weight_penalty} | Rating: {rating:.2f}")
    
    return rating




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


def chat_bot(query):
    answer = generate_content(prompt = query)
    return answer


def extract_text_from_website(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
    }
    r = requests.get(url=url, headers=headers)

    soup = BeautifulSoup(r.content, "lxml")

    for script in soup(["script", "style"]):
        script.extract()  

    text = soup.get_text()
    lines = (line.strip() for line in text.splitlines())
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    text = "\n".join(chunk for chunk in chunks if chunk)

    return text
