from dotenv import load_dotenv
import os

load_dotenv()

gemini_api = os.getenv("GEMINI_API")
# Retrieve configuration from environment variables
mongo_uri = os.getenv('MONGO_URI')
database_name = os.getenv('DATABASE_NAME')
collection_name = os.getenv('COLLECTION_NAME')
collection_name2=os.getenv('COLLECTION_NAME2')