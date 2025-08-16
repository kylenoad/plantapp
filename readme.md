# PlantVue
PlantVue is a Raspberry Pi powered smart plant monitoring application that tracks soil moisture levels in real time and displays the data on a live dashboard. The system helps plant owners keep their plants healthy by providing up-to-date moisture readings and visualizations.

[View the live Plant Monitor dashboard](https://plantvue.netlify.app/)

![Image1](https://github.com/user-attachments/assets/08ac5ba7-ba06-44b1-8266-b46a5c149821)
![Image2](https://github.com/user-attachments/assets/7bce8b52-3fc4-4aae-bb98-7fa55d625577)


## Plant Moisture Monitor – Database Setup

This repository contains the setup script for initializing the PostgreSQL database used in the **Plant Moisture Monitor** project.

## Setup

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
