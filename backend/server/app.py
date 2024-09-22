from flask import Flask, request, jsonify, session
from models import db, User
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app) 
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
    })

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') 
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id
    session.modified = True
    session.permanent = True
    
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop('user_id')

    return jsonify({
        "message": "Logged out"
    })

@app.route("/upload", methods=["POST"])
def upload_photos():
    face_folder = os.path.abspath(os.path.dirname(__file__)) + '/downloads/face/'
    photos_folder = os.path.abspath(os.path.dirname(__file__)) + '/downloads/photos/'
    face_list = request.files.getlist('face')
    photos_list = request.files.getlist('photos')
    for f in face_list:
        filename = secure_filename(f.filename)
        f.save(os.path.join(face_folder, filename))
    for f in photos_list:
        filename = secure_filename(f.filename)
        f.save(os.path.join(photos_folder, filename))
    return jsonify({
        "message": "Successfully uploaded"})

if __name__ == "__main__":
    app.run(debug=True, ssl_context=('certificates/server.crt', 'certificates/server.key'))

