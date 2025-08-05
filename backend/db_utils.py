import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def insert_reading(moisture_level):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO moisture_readings (moisture_level) VALUES (%s);",
            (moisture_level,)
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error inserting into database: {e}")
