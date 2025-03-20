from flask import Flask
from flask_sqlalchemy import SQLAlchemy


def config_db():
    app = Flask(__name__)

    SERVER_HOST = ""
    PORT_NUM = ""
    USERNAME = ""
    PASSWORD = ""
    DB_NAME = ""
    DB_URL = f"mysql+mysqlconnector://{USERNAME}:{PASSWORD}@{SERVER_HOST}:{PORT_NUM}/{DB_NAME}"
    app.config["SQLALCHEMY_DATABASE_URI"] = DB_URL
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db = SQLAlchemy(app)
    return app, db
