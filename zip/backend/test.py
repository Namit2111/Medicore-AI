from utils import utils,gemini
l = []
res = utils.llm_query(query="I have stomach ache since noon, I just ate some burger")
# print(res)

weight = utils.calculate_keyword_weights(res["keywords"])
google_res = utils.search_google(res["query"], num_results=15, advanced=True)

rated_links = []

for result in google_res:
    r = utils.rate_text_based_on_keywords(text=result.description, keyword_weights=weight)
    # print(res.description + " its rating is " + str(r))
    
    rated_links.append((result.url, r))


rated_links.sort(key=lambda x: x[1], reverse=True)

non_zero_links = [link for link in rated_links if link[1] > 0]

if len(non_zero_links) >= 2:
    l = non_zero_links[:3]

webtxt = ""
for link, rating in l:
    print(f"Link: {link} | Rating: {rating:.2f}")
    webtxt = webtxt + utils.extract_text_from_website(url=link)

prompt = utils.get_prompt(filename="cure.txt")
prompt = prompt.replace("{query}", res['query']).replace("{context}",webtxt)
# response = utils.chat_bot(query= prompt)
response = gemini.generate_json_content(prompt= prompt)
# print( utils.chat_bot(query= f"answer the user query based on context be precise query:{res['query']} context:{webtxt}"))
print(response)
# ---------------------------------------------------------------------------------------------------


# sample decorator
# def dec(fun):
#     def doo(*args,**kwargs):
#         print("inside dec")
#         res = fun()
#         print("outside dec")
#         return res
#     return doo

# @dec
# def fun():
#     print("inside fun")
#     return "hello"

# print(fun())





# from utils import gemini
# from utils import utils

# # Get the initial prompt
# f = utils.get_prompt(filename="Feedback_loop.txt")

# # Initialize conversation with the default question
# conversation = {"questions_answers": [{"question": "How can I help you today?", "answer": ""}]}

# # Helper function to format the conversation into a string for the prompt
# def format_conversation(conversation):
#     formatted = ""
#     for entry in conversation["questions_answers"]:
#         formatted += f"Q: {entry['question']}\nA: {entry['answer']}\n"
#     return formatted
# Flag = True
# while True:
#     # Get user input
#     i = input("input: ")
    
#     # Update the latest answer in the conversation
#     conversation["questions_answers"][-1]["answer"] = i
    
#     # Format the conversation as a string
#     formatted_conversation = format_conversation(conversation)
    
#     # Replace {user_text} in the prompt with the entire conversation
#     prompt = f.replace("{user_text}", formatted_conversation)
    
#     # Print the updated prompt for reference
#     # print(prompt)
    
#     # Get the response from gemini
#     res = gemini.generate_json_content(prompt=prompt)
    
#     # Print the response for reference
#     print(res['question'])
#     if res['got_all_info']:
#         Flag = False
#     # Append the new question with an empty answer for the next iteration
#     new_question = {"question": res.get("question", "What would you like to know next?"), "answer": ""}
#     conversation["questions_answers"].append(new_question)
    
#     # Print the current conversation log
#     # print(conversation)