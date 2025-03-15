import sqlite3
from flask import Blueprint, request, jsonify

router = Blueprint("router", __name__)
DATABASE = "flask_database.db"


@router.route("/temperature/<int:patient_id>", methods=["GET"])
def temperature(patient_id):
    try:
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()
        cursor.execute(
            "SELECT time_logged, temp_data FROM Temperatures WHERE patient_id = ?",
            (patient_id,),
        )
        data = cursor.fetchall()
        connection.close()
        return jsonify(data)
    except sqlite3.Error:
        return jsonify({"message": "Database error"}), 500


@router.route("/login", methods=["POST"])
def login_patient():
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    try:
        # Fetch user details
        cursor.execute("SELECT * FROM Users WHERE username = ?", (username,))
        user = cursor.fetchone()

        # the data is passed in with format (username, user_id, user_password, timestamp, user_type)
        if user is None or password != user[2]:  # Assuming user_password is at index 2
            return jsonify({"message": "Invalid username or password"}), 401

        # Update last login timestamp
        cursor.execute(
            "UPDATE Users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?",
            (user[0],),
        )  # Assuming patient_id is at index 0
        connection.commit()

        return jsonify(
            {"message": None, "id": user[1], "user_type": user[4]}
        )  # Returning patient_id
    except sqlite3.Error:
        return jsonify({"message": "Database error"}), 500
    finally:
        connection.close()


@router.route("/doctor/check_patient/<int:doctor_id>", methods=["GET"])
def doctor_check_patient(doctor_id):
    try:
        connection = sqlite3.connect(DATABASE)
        cursor = connection.cursor()
        cursor.execute(
            "SELECT patient_id FROM DoctorPatients WHERE doctor_id = ?",
            (doctor_id,),
        )
        data = cursor.fetchall()
        patient_data = []
        # get patient details
        for (pid,) in data:
            cursor.execute(
                "SELECT * FROM Users WHERE user_id = ?",
                (pid,),
            )
            p_data = cursor.fetchone()
            patient_data.append({"patient_id": p_data[1], "username": p_data[0]})
        connection.close()
        return jsonify(patient_data)
    except sqlite3.Error:
        return jsonify({"message": "Database error"}), 500


@router.route("/doctor/connect_patient", methods=["POST"])
def doctor_add_patient():
    data = request.get_json()
    doctor_id = data.get("doctor_id", None)
    patient_id = data.get("patient_id", None)

    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    try:
        cursor.execute(
            "INSERT INTO DoctorPatients (doctor_id, patient_id) VALUES (?, ?)",
            (doctor_id, patient_id),
        )
        connection.commit()
        return jsonify({"message": None}), 200
    except sqlite3.Error:
        return jsonify({"message": "Database error"}), 500
    finally:
        connection.close()


from app import app

app.register_blueprint(router, url_prefix="/")
