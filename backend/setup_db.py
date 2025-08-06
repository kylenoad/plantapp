import os
import sys
import psycopg2
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS moisture_readings (
    id SERIAL PRIMARY KEY,
    moisture_level INTEGER NOT NULL,
    timestamp TIMESTAMP DEFAULT now()
);
"""


#Load environment variables from the specified .env file.
def load_env(env_file):
    if not os.path.exists(env_file):
        print(f".env file not found: {env_file}")
        sys.exit(1)
    load_dotenv(env_file)

#Connect to the PostgreSQL database using the DATABASE_URL environment variable and return the connection.
def connect_to_db():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL not found in environment.")
        sys.exit(1)
    return psycopg2.connect(db_url)

#Create the moisture_readings table in the database if it doesn't exist. Uses the CREATE_TABLE_SQL statement. Commits changes and closes connection.
def setup_database():
    conn = connect_to_db()
    cur = conn.cursor()
    try:
        cur.execute(CREATE_TABLE_SQL)
        conn.commit()
    finally:
        cur.close()   # Close the cursor explicitly
        conn.close()  # Then close the connection


#seeds data with realistic drying conditions and moisture spikes to simulate watering
def seed_data(days_back=365, interval_minutes=60):
    random.seed(1)
    conn = connect_to_db()
    try:
        cur = conn.cursor()
        now = datetime.now()
        cur.execute("DELETE FROM moisture_readings")

        total_minutes = days_back * 24 * 60

        moisture = 325  # Start at fully wet (lowest sensor reading)
        watering_interval = 5 * 24 * 60  # watering every 5 days in minutes so we can simulate rapid changes in moisture
        last_watering = 0

        for minutes_ago in range(0, total_minutes, interval_minutes):
            timestamp = now - timedelta(minutes=minutes_ago)

            if (minutes_ago - last_watering) >= watering_interval:
                # Watering event: reset moisture to wet range
                moisture = random.randint(320, 340)
                last_watering = minutes_ago
            else:
                # Soil drying out: increase moisture level towards dry
                moisture += random.uniform(3.0, 6.0)
                moisture = min(moisture, 850)  # Cap at fully dry which for my sensor is 850

            cur.execute(
                "INSERT INTO moisture_readings (moisture_level, timestamp) VALUES (%s, %s);",
                (int(moisture), timestamp)
            )

        conn.commit()
        cur.close()
        print("Seeded moisture data.")
    finally:
        conn.close()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python setup_db.py [.env.dev | .env.test]")
        sys.exit(1)

    env_file = sys.argv[1]
    load_env(env_file)

    try:
        print("Setting up database")
        setup_database()
        print("Seeding data")
        seed_data()
        print("Database setup and seeding completed successfully.")
    except Exception as e:
        print("Error during setup:", e)
