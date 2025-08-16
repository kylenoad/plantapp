from db_connection import connect_to_db

def insert_reading(moisture_level):
    try:
        conn = connect_to_db()
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