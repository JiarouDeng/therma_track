from flask import Flask
from config import Config
from models import db
from routes import register_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)



with app.app_context():
    db.create_all()  # 创建数据库表

register_routes(app)

@app.route('/')
def hello():
    return "Hello, World!"



if __name__ == '__main__':
    app.run(debug=True)