from flask import request, jsonify
from models import db, User
import logging

def register_routes(app):
    @app.route('/api/signup', methods=['POST']) 
    def signup():
        logging.info("Received signup request")
        data = request.json
        logging.info(f"Request data: {data}")  
        
        username = data.get('username')
        password = data.get('password')

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username already exists!"}), 400

        new_user = User(username=username)
        new_user.set_password(password)  # 加密密码
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully!"}), 201
    
    @app.route('/api/login', methods=['POST'])
    def login():
        
        logging.info("Received login request")
        data = request.json
        logging.info(f"Request data: {data}")
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({"message": "Username and password are required"}), 400
        
        user = User.query.filter_by(username=username).first()

        # 验证用户是否存在且密码正确
        if user and user.check_password(password):
            return jsonify({"message": "Login successful!", "user_type": "doctor" if username == "doctor" else "patient"}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401