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
