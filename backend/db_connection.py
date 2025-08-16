import os
import psycopg2

DATABASE_URL = os.getenv("DATABASE_URL")

def connect_to_db():
    return psycopg2.connect(DATABASE_URL, sslmode='require')
