
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from datetime import datetime
from db import set_appointment,get_available_schedule



mai_api_v1 = Blueprint(
    'mai_api_v1', 'mai_api_v1', url_prefix='/api/v1/mai')

CORS(mai_api_v1)

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