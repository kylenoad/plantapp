import os
from dotenv import load_dotenv
load_dotenv('.env.test') 

import pytest
from app import app
from setup_db import seed_data
from db_connection import connect_to_db
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

@pytest.fixture(scope="function", autouse=True)
def reset_db():
    conn = connect_to_db()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM moisture_readings;")
        cur.execute("ALTER SEQUENCE moisture_readings_id_seq RESTART WITH 1;")
        conn.commit()
        seed_data()
        print("Database reset and seeded for test.")
    finally:
        cur.close()
        conn.close()

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client


class TestReadingsDay:
    def test_response_structure_day(self, client):
        response = client.get('/readings?period=day')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        if data:  
            reading = data[0]
            assert "moisture_level" in reading
            assert "timestamp" in reading

    def test_valid_timestamps_day(self, client):
        response = client.get('/readings?period=day')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        now = datetime.now()
        one_day_ago = now - timedelta(days=1)

        for reading in data:
            assert "moisture_level" in reading
            assert "timestamp" in reading

            reading_time = datetime.fromisoformat(reading["timestamp"])
            assert reading_time >= one_day_ago
            assert reading_time <= now
  
class TestReadingsWeek:
    def test_response_structure_week(self, client):
        response = client.get('/readings?period=week')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        if data:  
            reading = data[0]
            assert "moisture_level" in reading
            assert "timestamp" in reading

    def test_valid_timestamps_week(self, client):
        response = client.get('/readings?period=week')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        now = datetime.now()
        one_week_ago = now - timedelta(days=7)

        for reading in data:
            assert "moisture_level" in reading
            assert "timestamp" in reading

            reading_time = datetime.fromisoformat(reading["timestamp"])
            assert reading_time >= one_week_ago
            assert reading_time <= now
            
class TestReadingsMonth:
    def test_response_structure_month(self, client):
        response = client.get('/readings?period=month')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        if data:  
            reading = data[0]
            assert "moisture_level" in reading
            assert "timestamp" in reading

    def test_valid_timestamps_month(self, client):
        response = client.get('/readings?period=month')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        now = datetime.now()
        one_month_ago = now - relativedelta(months=1)

        for reading in data:
            assert "moisture_level" in reading
            assert "timestamp" in reading

            reading_time = datetime.fromisoformat(reading["timestamp"])
            assert reading_time >= one_month_ago
            assert reading_time <= now

class TestReadingsYear:
    def test_response_structure_year(self, client):
        response = client.get('/readings?period=year')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        if data:  
            reading = data[0]
            assert "moisture_level" in reading
            assert "timestamp" in reading

    def test_valid_timestamps_year(self, client):
        response = client.get('/readings?period=year')
        assert response.status_code == 200

        data = response.get_json()
        assert isinstance(data, list)

        now = datetime.now()
        one_year_ago = now - relativedelta(years=1)

        for reading in data:
            assert "moisture_level" in reading
            assert "timestamp" in reading

            reading_time = datetime.fromisoformat(reading["timestamp"])
            assert reading_time >= one_year_ago
            assert reading_time <= now




