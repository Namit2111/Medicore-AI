from flask import Blueprint, session, request, jsonify
from utils import gemini, utils  # Assuming utils and gemini are in the app folder

chat_app = Blueprint('chat_app',"chat_app", url_prefix="/chat")



def initialize_conversation():
    """
    Initializes a new conversation with a default question.

    returns:
    conversation (dict): A dictionary with the default question-answer pair.
    """
    return {"questions_answers": [{"question": "How can I help you today?", "answer": ""}]}


def format_conversation(conversation):
    """
    Formats the conversation into a string suitable for use in a prompt.

    parameters:
    conversation (dict): The current conversation consisting of questions and answers.

    returns:
    formatted (str): A string where questions and answers are formatted for the prompt.
    """
    formatted = ""
    for entry in conversation["questions_answers"]:
        formatted += f"Q: {entry['question']}\nA: {entry['answer']}\n"
    return formatted

@chat_app.route('/', methods=['POST'])
def chat():
    """
    Handles the chatbot conversation by updating the conversation based on user input, 
    generating a prompt for the LLM, and returning the next question or final message.

    returns:
    response (json): A JSON response with either the next question or a thank you message.
    """
    user_input = request.json.get('input')
    
    # Check if conversation exists in session, if not initialize it
    if 'conversation' not in session:
        session['conversation'] = initialize_conversation()

    # Update the conversation with the user's latest input
    conversation = session['conversation']
    conversation["questions_answers"][-1]["answer"] = user_input
    
    # Get the prompt template and replace {user_text} with the conversation
    f = utils.get_prompt(filename="Feedback_loop.txt")
    formatted_conversation = format_conversation(conversation)
    prompt = f.replace("{user_text}", formatted_conversation)
    
    # Get the response from the Gemini model
    res = gemini.generate_json_content(prompt=prompt)
    
    # Check if all information is gathered
    if res['got_all_info']:
        response_text = "Thank you! I have all the information I need."
        session.pop('conversation')  # End the session if all info is gathered
        print("Final conversation log:")
        print(format_conversation(conversation))

    else:
        # Append the next question to the conversation
        new_question = {"question": res.get("question", "What would you like to know next?"), "answer": ""}
        conversation["questions_answers"].append(new_question)
        response_text = res['question']

    # Update session with the modified conversation
    session['conversation'] = conversation
    
    # Return the new question to the user
    return jsonify({"response": response_text,"flag":res['got_all_info']})
