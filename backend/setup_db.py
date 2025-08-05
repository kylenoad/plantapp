import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS moisture_readings (
    id SERIAL PRIMARY KEY,
    moisture_level INTEGER NOT NULL,
    timestamp TIMESTAMP DEFAULT now()
);
"""

def setup_database():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = True
        cur = conn.cursor()
        print("Connected to database")

        cur.execute(CREATE_TABLE_SQL)
        print("Table 'moisture_readings' created")

        cur.close()
        conn.close()
        print("Setup complete")

    except Exception as e:
        print("Error setting up the database:", e)

if __name__ == "__main__":
    setup_database()
