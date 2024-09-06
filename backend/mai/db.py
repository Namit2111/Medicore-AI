import json

from pymongo import MongoClient
import os
from bson.objectid import ObjectId
from dotenv import load_dotenv
import time
import uuid
from datetime import datetime
# from xid import Xid

# Load environment variables from .env file
load_dotenv()

# Retrieve configuration from environment variables
mongo_uri = os.getenv('MONGO_URI')
database_name = os.getenv('DATABASE_NAME')
collection_name = os.getenv('COLLECTION_NAME')
collection_name2=os.getenv('COLLECTION_NAME2')
client=MongoClient(mongo_uri)
db=client[database_name]
def get_available_schedule():
    collection=db[collection_name]
    
    all=collection.find()
    return all
def set_appointment(id,name,problem,phone,email,time,date):
    collection=db[collection_name2]
    oid=ObjectId()
    document={
        "_id":oid,
        "appointment_id": id,
        "patient_name": name,
        "patient_problem": problem,
        "patient_phone": phone,
        "patient_email": f"{email if email is not None else None}",
        "date": date,
        "time":time
        }
    result=collection.insert_one(document)
    acknowledge= result.inserted_id
    return acknowledge
# Helper function to standardize date format
def standardize_date(date_str):
    try:
        return datetime.strptime(date_str, '%d-%m-%Y').strftime('%d-%m-%Y')
    except ValueError:
        try:
            return datetime.strptime(date_str, '%d-%m-%y').strftime('%d-%m-%Y')
        except ValueError:
            return None

# Helper function to standardize time format
def standardize_time(time_str):
    try:
        return datetime.strptime(time_str, '%I:%M %p').strftime('%I:%M %p')  # Convert to 12-hour format
    except ValueError:
        return None

def get_appointment_details(ap_id):
    appointment_collection = db[collection_name2]
    
    # Ensure ap_id is an ObjectId if necessary
    if not isinstance(ap_id, ObjectId):
        ap_id = ObjectId(ap_id)

    # Fetch appointment details
    appointment_details = appointment_collection.find_one({"_id": ap_id})
    
    if appointment_details:
        second_doc_id = appointment_details.get('appointment_id')  # Assuming 'appointment_id' is the field storing the second doc's ID
        
        if second_doc_id:
            second_collection = db[collection_name]
            
            # Ensure second_doc_id is an ObjectId if necess
            second_doc_details = second_collection.find_one({"_id": second_doc_id})

            if second_doc_details:
                doctor = second_doc_details.get('doctor_name', 'Unknown Doctor')
                patient = appointment_details.get('patient_name', 'Unknown Patient')
                appointment_id = str(ap_id)

                avdate, avtime = None, None
                
                # Get the appointment date and time
                appointment_time = appointment_details.get('time')
                appointment_date = appointment_details.get('date')

                # Debugging output
                # print(f"Appointment Time: {appointment_time}")
                # print(f"Appointment Date: {appointment_date}")
                # print(f"Second Document Schedule: {second_doc_details['schedule']}")

                # Standardize date and time for comparison
                standardized_appointment_date = standardize_date(appointment_date)
                standardized_appointment_time = standardize_time(appointment_time)
                
                # print(f"Standardized Appointment Date: {standardized_appointment_date}")
                # print(f"Standardized Appointment Time: {standardized_appointment_time}")
                
                # Find the matching schedule and time in the second document
                for x in second_doc_details.get('schedule', []):
                    schedule_date = standardize_date(x.get('date', ''))
                    # print(f"Checking Schedule Date: {schedule_date}")
                    
                    if schedule_date == standardized_appointment_date:
                        # print(f"Matching date found: {schedule_date}")
                        
                        for y in x.get('time', []):
                            standardized_schedule_time = standardize_time(y.strip())
                            # print(f"Checking time: {standardized_schedule_time} against {standardized_appointment_time}")
                            
                            if standardized_schedule_time == standardized_appointment_time:
                                avdate = schedule_date
                                avtime = standardized_schedule_time
                                # print(f"Match found: Date - {avdate}, Time - {avtime}")
                                break
                if avdate and avtime:
                    return {
                        "Name": patient,
                        "Appointment_id": appointment_id,
                        "Doctor": doctor,
                        "date": avdate,
                        "time": avtime
                    }
                else:
                    return "No matching schedule found for the given time and date."
            else:
                return f"No second document found with id: {second_doc_id}"
        else:
            return appointment_details
    else:
        return f"No appointment found with id: {ap_id}"

def get_scheduleid(doctor):
     collection=db[collection_name]
     doc_details =collection.find_one({"doctor_name",doctor})
     return doc_details['_id']
if __name__=='__main__':
    ap_id=set_appointment('schedule_1','Namit','Brain Problem',987545465,'some email','4:00 pm','21-7-2024')
    print(ap_id)
    print(get_appointment_details(ap_id))
  