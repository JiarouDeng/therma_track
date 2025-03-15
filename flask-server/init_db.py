import sqlite3
import random
from datetime import datetime, timedelta


def random_timestamp(init_time):
    """Generate a random timestamp between start_date and end_date."""
    start_date, end_date = (
        ("2023-01-01", "2023-02-01") if init_time else ("2023-02-01", "2025-02-01")
    )
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    random_time = start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds()))
    )
    return random_time.strftime("%Y-%m-%d %H:%M:%S")


def initialize_patients(cursor):
    patient_commands = [
        ("sad_patient", "sad", random_timestamp(init_time=True), 0),
        ("happy_patient", "happy", random_timestamp(init_time=True), 0),
        ("stressed_patient", "stressed", random_timestamp(init_time=True), 0),
        ("sleepy_patient", "sleepy", random_timestamp(init_time=True), 0),
    ]
    cursor.executemany(
        "INSERT INTO Users (username, user_password, last_login, user_type) VALUES (?, ?, ?, ?);",
        patient_commands,
    )


def initialize_doctors(cursor):
    doctor_commands = [
        ("sad_doctor", "sad", random_timestamp(init_time=True), 1),
        ("happy_doctor", "happy", random_timestamp(init_time=True), 1),
        ("stressed_doctor", "stressed", random_timestamp(init_time=True), 1),
        ("sleepy_doctor", "sleepy", random_timestamp(init_time=True), 1),
    ]
    cursor.executemany(
        "INSERT INTO Users (username, user_password, last_login, user_type) VALUES (?, ?, ?, ?);",
        doctor_commands,
    )


def initialize_temperatures(cursor):
    data = []

    for _ in range(80):
        random_patient = random.randint(1, 4)
        random_temperature = random.randint(35, 42)
        data.append(
            (
                random_patient,
                random_patient,
                random_temperature,
                random_timestamp(init_time=False),
            )
        )

    cursor.executemany(
        "INSERT INTO Temperatures (patient_id, device_id, temp_data, time_logged) VALUES (?, ?, ?, ?);",
        data,
    )


def init_db():
    """Initialize the database with schema."""
    with sqlite3.connect("flask_database.db") as connection:
        with open("schema.sql") as f:
            connection.executescript(f.read())

        cursor = connection.cursor()
        initialize_patients(cursor)
        initialize_doctors(cursor)
        initialize_temperatures(cursor)
        connection.commit()


if __name__ == "__main__":
    init_db()
