import google.generativeai as genai
from config.config import gemini_api
import json

genai.configure(api_key=gemini_api)


#to generate json response
model_json = genai.GenerativeModel('gemini-1.5-flash',generation_config={"response_mime_type": "application/json"})
def generate_json_content(prompt):
    response = model_json.generate_content(prompt)
    response_json = json.loads(response.text)
    return response_json

#to generate text response
model_text = genai.GenerativeModel('gemini-1.5-flash')
def generate_content(prompt):

    response = model.generate_content(prompt)
    return response.text