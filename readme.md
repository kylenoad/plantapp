# Plant Moisture Monitor – Database Setup

This repository contains the setup script for initializing the PostgreSQL database used in the **Plant Moisture Monitor** project.

## Requirements

- Python 3.8+
- PostgreSQL (local or cloud instance)
- pip packages:
  - `psycopg2`
  - `python-dotenv`

## Project Structure

***********************TO ADD LATER************************************


## Environment Setup

1. **Clone this repository**  
    git clone https://github.com/kylenoad/plantapp.git
    cd plantapp/backend

2. **Create a virtual environment**  
    python -m venv venv
    source venv/bin/activate

3. **Install dependencies** 
    pip install -r requirements.txt

3. **Create PostgreSQL user and database**
    sudo -u postgres psql

    inside psql promt, type:
        CREATE DATABASE plant_db;
        CREATE USER plantapp_user WITH PASSWORD 'yourpassword';
        GRANT ALL PRIVILEGES ON DATABASE plant_db TO plantapp_user;

4. **Set up a .env file** 
    Create a .env file in the backend/ directory with the following:
    DATABASE_URL=postgresql://plantapp_user:yourpassword@localhost:5432/plant_db
    **Replace plantapp_user, yourpassword, and plant_db with your PostgreSQL username, password, and database name.**

5. **Run the setup db script** 
    python setup_db.py

    This script will:
        Connect to your database using the DATABASE_URL
        Create the moisture_readings table if it doesn’t already exist
