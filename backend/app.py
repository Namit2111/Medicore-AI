from flask import Flask
# from app.schedule import mai_api_v1
from app.frontend import frontend  
from app.chat import chat_app
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
# Register blueprints
# app.register_blueprint(mai_api_v1)
app.register_blueprint(frontend)
app.register_blueprint(chat_app)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)