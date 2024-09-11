from utils.decorators import time_it
import json
import os
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
DATA_FILE = 'db/doctors_data.json'
def load_doctors_data():
    """
    Loads the doctors' data from the DATA_FILE.

    The DATA_FILE is expected to be a JSON file containing a list of doctors, each with
    their name, speciality, and a list of available time slots.

    returns:
    doctors (list): A list of doctors, each represented as a dictionary with keys 'name',
                    'speciality', and 'time_slots'.
    """
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return []
@time_it
def save_doctors_data(data):
    
    """
    Saves the doctors' data to the DATA_FILE.

    parameters:
    data (list): A list of doctors, each represented as a dictionary with keys 'name',
                'speciality', and 'time_slots'.
    """
    
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)
