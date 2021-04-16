from flask import Flask
app = Flask(__name__)

from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'