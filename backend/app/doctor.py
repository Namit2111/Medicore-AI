from flask import Blueprint, request, jsonify
from utils import helper,decorators
import os 
import json
doctor = Blueprint('doctor', __name__,url_prefix="/doctor")




@doctor.route('/save',methods=['POST'])
def save_doctor():
    try:
        doctor_data = request.json
        
        doctors = helper.load_doctors_data()
        doctors.append(doctor_data)

        helper.save_doctors_data(doctors)

        return jsonify({"message": "Doctor registered successfully!"}), 200
    except Exception as e:
    
        return jsonify({"error": str(e)}), 500