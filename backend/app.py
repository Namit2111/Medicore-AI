from flask import Flask
# from flask_session import Session
# from app.schedule import mai_api_v1
from app.frontend import frontend  
from app.chat import chat_app
from flask_cors import CORS

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax' 
app.config['SESSION_COOKIE_SECURE'] = False
# Enable CORS for all routes and origins
CORS(app,supports_credentials=True)

# Register blueprints
# app.register_blueprint(mai_api_v1)
app.register_blueprint(frontend)
app.register_blueprint(chat_app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000,debug=True)