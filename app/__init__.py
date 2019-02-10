from flask import Flask
from flask_compress import Compress
import os

basedir = os.path.abspath(os.path.dirname(__file__)) 

app = Flask(__name__)
Compress(app)


from app import views
