from flask import Blueprint, send_from_directory
import os

frontend = Blueprint('frontend', __name__, static_folder='../../frontend/dist')

@frontend.route('/')
def serve_react_app():
    return send_from_directory(frontend.static_folder, 'index.html')

@frontend.route('/<path:path>')
def serve_static_files(path):
    file_path = os.path.join(frontend.static_folder, path)
    return send_from_directory(frontend.static_folder, path)