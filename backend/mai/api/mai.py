
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from datetime import datetime
from db import set_appointment,get_available_schedule



mai_api_v1 = Blueprint(
    'mai_api_v1', 'mai_api_v1', url_prefix='/api/v1/mai')

CORS(mai_api_v1)

messages=[]
@mai_api_v1.route('/schedule',methods=["POST"])
def save_appoinment_details():
    post_data=request.get_json()
    try:
        appointment_id="something"
        name="patient name"
        problem="some problem"
        phone="phone number"
        email="email"
        time="time"
        date="date"
        set_appointment(appointment_id,name,problem,phone,email,time,date)
        return jsonify({}),200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
#middleware
@mai_api_v1.before_request
def check_keywords():
    if request.method == 'POST' and request.is_json:
        data = request.get_json()
        user_message = data.get('message', '').lower()
        
        # List of keywords to check for
        keywords = [ 'schedule', 'appointment']
        
        # Check if any keyword is in the user's message
        if any(keyword in user_message for keyword in keywords):
            response="some function for appointment setting"
            return jsonify({
                'response': response
            }), 200

@mai_api_v1.route('/messages',methods=['GET'])
def get_messages():
    messages="some message"
    return jsonify(messages)
@mai_api_v1.route('/messages',methods=['POST'])
def post_message():
    data = request.get_json()
    sender = data.get('sender')
    text = data.get('text')
    
    if not sender or not text:
        return jsonify({'error': 'Sender and text are required'}), 400

    new_message = {
        'sender': sender,
        'text': text,
        'timestamp': datetime.utcnow().isoformat()
    }
    messages.append(new_message)
    return jsonify(new_message), 201
 