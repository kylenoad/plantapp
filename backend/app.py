from flask import Flask, request, jsonify
import psycopg2
from db_connection import connect_to_db
from flask_cors import CORS
import os
from dotenv import load_dotenv

if os.getenv("FLASK_ENV") != "production":
    load_dotenv(".env.dev")

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Moisture API is running"

@app.route('/readings', methods=["GET"])
def get_readings():
    period = request.args.get('period', 'day')

    valid_periods = {
        'day': '1 day',
        'week': '7 days',
        'month': '1 month',
        'year': '1 year'
    }

    if period not in valid_periods:
        return jsonify({"error": "Invalid period."}), 400

    try:
        conn = connect_to_db()
        cur = conn.cursor()

        cur.execute("""
            SELECT moisture_level, timestamp 
            FROM moisture_readings 
            WHERE timestamp >= NOW() - INTERVAL %s
            ORDER BY timestamp DESC;
        """, (valid_periods[period],))

        rows = cur.fetchall()

        cur.close()
        conn.close()

        readings = []
        for row in rows:
            readings.append({
                "moisture_level": row[0],
                "timestamp": row[1].isoformat()
            })
        return jsonify(readings)

    except Exception as e:
        print(f"ERROR in /readings route: {e}")  
        return jsonify(error="Something went wrong"), 500


@app.route('/latest', methods=["GET"])
def get_latest():
    try:
        conn = connect_to_db()
        cur = conn.cursor()

        cur.execute("""
            SELECT moisture_level, timestamp 
            FROM moisture_readings
            ORDER BY timestamp DESC
            LIMIT 1;
        """)

        row = cur.fetchone()
        cur.close()
        conn.close()

        if row:
            reading = {
                "moisture_level": row[0],
                "timestamp": row[1].isoformat()
            }
            return jsonify(reading)
        else:
            return jsonify(error="No readings found"), 404

    except Exception as e:
        print(f"ERROR in /latest route: {e}")  
        return jsonify(error="Something went wrong"), 500


@app.route('/status', methods=["GET"])
def get_status():
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("""
            SELECT moisture_level, timestamp 
            FROM moisture_readings
            ORDER BY timestamp DESC
            LIMIT 1;
        """)

        row = cur.fetchone()
        cur.close()
        conn.close()

        if row is None:
            return jsonify({"error": "No readings found"}), 404

        moisture = row[0]
        timestamp = row[1].isoformat()

        if moisture >= 700:
            status = "needs watering"
        elif moisture >= 600:
            status = "water soon"
        else:
            status = "ok"

        return jsonify({
            "status": status,
            "moisture_level": moisture,
            "timestamp": timestamp
        })
    
    except Exception as e:
        print(f"ERROR in /status route: {e}")  
        return jsonify(error="Something went wrong"), 500


if __name__ == "__main__":
    app.run(debug=True)



