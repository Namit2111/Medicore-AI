from flask import Blueprint, request, jsonify,session
from flask_cors import CORS
from datetime import datetime
from utils import gemini, utils,helper  
from db.db import set_appointment,get_available_schedule
chat_app = Blueprint('chat_app',"chat_app", url_prefix="/chat")


messages=[]
@chat_app.route('/schedule',methods=["POST"])
def save_appoinment_details():
    post_data=request.get_json('message')
    if 'conversation' not in session:
        session['conversation'] = helper.initialize_conversation()

    # Update the conversation with the user's latest input
    conversation = session['conversation']
    conversation["questions_answers"][-1]["answer"] = post_data
    f = utils.get_prompt(filename="appointmentloop.txt")
    formatted_conversation = helper.format_conversation(conversation)
    prompt = f.replace("{user_text}", formatted_conversation)
    schedule=get_available_schedule()
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
    appointmentresult="""extracting json format from conversation with information like
    appointment_id,patient_name,problem,phone,email,time,date 
    """
    pass

@chat_app('/schedule/result',methods=['POST'])
def  get_appointment_result():
    if 'conversation' not in session:
        return jsonify({"response":"No conversation found"})
    scheduledet=utils.get_avaialable_schedule()
    
   
    
    pass
