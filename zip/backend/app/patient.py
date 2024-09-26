from flask import Blueprint, request, jsonify
from utils import helper,decorators

from utils.decorators import time_it
import os 
import json
patient = Blueprint('patient', __name__,url_prefix="/patient")




@patient.route('/save',methods=['POST'])
def save_patient():
    try:
        patient_data = request.json
        
        patients = helper.load_patients_data()
        
        patients.append(patient_data)

        helper.save_patients_data(patients)

        return jsonify({"message": "patient registered successfully!\n You can login now to use the chat bot"}), 200
    except Exception as e:
        
        return jsonify({"error": str(e)}), 500
@time_it
@patient.route('/login',methods=["POST"])
def login_patient():
    try:
        patient_data = request.json
        print(patient_data)
        patients = helper.load_patients_data()
        for x in patients:
            if x['email']==patient_data['email'] and x['password']==patient_data['password']:
                print(patient_data['email'],x['email'],patient_data['password'],x['password'],x['name'])
                return jsonify({"message": {'name':x['name']}}),200
            
    except Exception:
        
        return jsonify({"error": "Invalid email or password."}), 401