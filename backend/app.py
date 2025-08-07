from flask import Flask, request, jsonify
import psycopg2
from db_connection import connect_to_db

app = Flask(__name__)

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


if __name__ == "__main__":
    app.run(debug=True, port=5000)



# Endpoints needed:

#     -Retrieve readings by time period (day, week, month, year): GET /readings
#     -Water soon / water now warnings : GET /status
#     - Get latest reading : GET /readings/latest