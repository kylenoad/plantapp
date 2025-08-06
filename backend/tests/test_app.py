import pytest
from app import app
from setup_db import seed_data

@pytest.fixture(scope="function", autouse=True)
def seed_database():
    seed_data()

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client

