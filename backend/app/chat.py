from flask import Blueprint, session, request, jsonify
from utils import gemini, utils,helper  
import math 
chat_app = Blueprint('chat_app',"chat_app", url_prefix="/chat")


# @chat_app.route('/intro',methods=['POST'])
# def chatintro():
#     """
#     Handles the chatbot conversation by updating the conversation based on user input,
#     generating a prompt for the LLM, and returning the next question or final message.

#     returns:
#     response (json): A JSON response with either the next question or a thank you message.
#     """

#     user_input = request.json.get('message')
#     # Check if conversation exists in session, if not initialize it
#     if 'conversation' not in session:
#         session['conversation'] = helper.initialize_conversation()

#     # Update the conversation with the user's latest input
#     conversation = session['conversation']
#     conversation["questions_answers"][-1]["answer"] = user_input
#     # intro=utils.get_prompt(filename="introloop.txt")
#     # intro_conversation=helper.format_conversation(conversation)
#     # Get the prompt template and replace {user_text} with the conversation
#     f = utils.get_prompt(filename="introloop.txt")
#     formatted_conversation = helper.format_conversation(conversation)
#     prompt = f.replace("{user_text}", formatted_conversation)
    
#     # Get the response from the Gemini model
#     res = gemini.generate_json_content(prompt=prompt)
#     print(helper.format_conversation(conversation))
#     # Check if all information is gathered
#     if res['got_all_info']:
#         response_text = "Thank you! I have all the information I need."
#        # session.pop('conversation')  # End the session if all info is gathered
        

#     else:
#         # Append the next question to the conversation
#         new_question = {"question": res.get("question", "What would you like to know next?"), "answer": ""}
#         conversation["questions_answers"].append(new_question)
#         response_text = res['question']
        

#     # Update session with the modified conversation
#     session['conversation'] = conversation

#     # Return the new question to the user
#     return jsonify({"response": response_text,"flag":res['got_all_info']})
@chat_app.route('/', methods=['POST'])
def chat():
    """
    Handles the chatbot conversation by updating the conversation based on user input, 
    generating a prompt for the LLM, and returning the next question or final message.

    returns:
    response (json): A JSON response with either the next question or a thank you message.
    """

    user_input = request.json.get('message')
    # Check if conversation exists in session, if not initialize it
    if 'conversation' not in session:
        session['conversation'] = helper.initialize_conversation()

    # Update the conversation with the user's latest input
    conversation = session['conversation']
    conversation["questions_answers"][-1]["answer"] = user_input
    # intro=utils.get_prompt(filename="introloop.txt")
    # intro_conversation=helper.format_conversation(conversation)
    # Get the prompt template and replace {user_text} with the conversation
    f = utils.get_prompt(filename="Feedback_loop.txt")
    formatted_conversation = helper.format_conversation(conversation)
    prompt = f.replace("{user_text}", formatted_conversation)
    
    # Get the response from the Gemini model
    res = gemini.generate_json_content(prompt=prompt)
    print(helper.format_conversation(conversation))
    # Check if all information is gathered
    if res['got_all_info']:
        response_text = "Thank you! I have all the information I need."
       # session.pop('conversation')  # End the session if all info is gathered
        

    else:
        # Append the next question to the conversation
        new_question = {"question": res.get("question", "What would you like to know next?"), "answer": ""}
        conversation["questions_answers"].append(new_question)
        response_text = res['question']
        

    # Update session with the modified conversation
    session['conversation'] = conversation

    # Return the new question to the user
    return jsonify({"response": response_text,"flag":res['got_all_info'],"schedule_f":res["set_schedule"]})

@chat_app.route("/result",methods=['POST'])
def web_res():
    """
    Handles the chatbot's web result generation by taking the user's conversation,
    querying an LLM to extract keywords, searching Google for relevant results, 
    rating those results based on keyword relevance, extracting text from the top results, 
    and then using the extracted content to generate a final response via an LLM.

    returns:
    response (json): A JSON response with the final chatbot answer based on web content and user query.
    """

    # Check if there is a conversation in the session
    if 'conversation' not in session:
        return jsonify({"response":"No conversation found"})
    
    rated_links= []
    
    # Query the LLM using the formatted conversation
    llm_res = utils.llm_query(query=helper.format_conversation(session['conversation']))
    
    # Calculate keyword weights based on the keywords returned from the LLM
    keywords_weight = utils.calculate_keyword_weights(keywords=llm_res['keywords'])
    
    # Search Google for relevant results using the query extracted from the LLM response
    google_res = utils.search_google(llm_res['query'], num_results=10,advanced=True)
    # print(google_res)
  
    # Iterate through the Google search results and rate each one based on keyword relevance
    for result in google_res:
        # print(result)
        rating = utils.rate_text_based_on_keywords(text=result.description, keyword_weights=keywords_weight)
        rated_links.append((result.url,rating))
    
    # Sort the links based on their rating in descending order (highest rated first)
    rated_links.sort(key =lambda x:x[1],reverse=True)

    # Filter out any links with a zero rating
    non_zero_links = [link for link in rated_links if math.ceil(link[1])>0]
    # print(non_zero_links)

    # If there are at least three rated links, select the top 3

    if len(non_zero_links) >=3:
        final_links = non_zero_links[:3]
    else:
        final_links = non_zero_links


    webtxt = "" 

    # Extract text from the top-rated websites and concatenate it for context

    for link, ratinf in final_links:
        webtxt = webtxt + utils.extract_text_from_website(url = link)

    #Final response from chatbot 
    prompt = utils.get_prompt(filename="cure.txt")
    prompt = prompt.replace("{query}", llm_res['query']).replace("{context}",webtxt)
    response = gemini.generate_json_content(prompt= prompt)
    # session.pop('conversation', None)
    return jsonify({"response":response})
@chat_app.route('/session')
def sessionpop():
    session.pop('conversation',None)
    return "session poper"