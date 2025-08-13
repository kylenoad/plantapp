import os
import psycopg2
from dotenv import load_dotenv

if os.getenv("FLASK_ENV") != "production":
    load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def connect_to_db():
    return psycopg2.connect(DATABASE_URL, sslmode='require')