from flask import Flask, send_from_directory
from app.schedule import mai_api_v1

app = Flask(__name__, static_folder='../frontend/dist')
app.register_blueprint(mai_api_v1)

# Serve the React app
@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

 

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
