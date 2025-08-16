# PlantVue
PlantVue is a Raspberry Pi powered smart plant monitoring application that tracks soil moisture levels in real time and displays the data on a live dashboard. The system helps plant owners keep their plants healthy by providing up-to-date moisture readings and visualisations.

**Dashboard Components:**
- **Current Moisture** – Shows the latest soil moisture reading.  
- **Moisture Chart** – Visualises moisture trends over time (Day, Week, Month, Year).  
- **Plant Status Indicators** – Highlights whether plants need watering.  
- **Last Watered** – Indicates when the last watering event happened.

[View the live Plant Monitor dashboard](https://plantvue.netlify.app/)

Note: If the dashboard hasn’t been used for a while, it may take ~30 seconds to load. This is because the backend API is hosted on a free tier and spins down during inactivity.

![Plant 1](https://github.com/user-attachments/assets/08ac5ba7-ba06-44b1-8266-b46a5c149821)
![Plant 2](https://github.com/user-attachments/assets/7bce8b52-3fc4-4aae-bb98-7fa55d625577)

## Table of Contents
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [Hardware Required](#hardware-required)
- [Hardware Setup](#hardware-setup)
- [Future Developments](#future-developments)


### Database Setup

This repository contains the setup script for initializing and seeding the PostgreSQL database with test data.

## Setup

1. **Clone this repository**  
    git clone https://github.com/kylenoad/plantapp.git
    cd plantapp/backend

2. **Create a virtual environment**  
    python -m venv venv
    source venv/bin/activate

3. **Install dependencies** 
    pip install -r requirements.txt

4. **Create PostgreSQL user and database**
    sudo -u postgres psql

    inside psql prompt, type:
        CREATE DATABASE plant_db;
        CREATE USER plantapp_user WITH PASSWORD 'yourpassword';
        GRANT ALL PRIVILEGES ON DATABASE plant_db TO plantapp_user;

5. **Set up a .env file** 
    Create a .env file in the backend/ directory with the following:
    DATABASE_URL=postgresql://plantapp_user:yourpassword@localhost:5432/plant_db
   
    **Replace plantapp_user, yourpassword, and plant_db with your PostgreSQL username, password, and database name.**

7. **Run the setup and seed script**
    in bash, run python setup_db.py .env
   
    Replace `.env` with the path to your environment file (e.g., `.env.dev` or `.env.test`).  
    This script will:
    - Create the `moisture_readings` table if it doesn’t exist
    - Delete any existing data in the table
    - Populate it with realistic test moisture readings for the past year

## Running the App

### Option 1: Run locally with test data
Follow the setup steps above to create and seed the database.  
This will simulate a year’s worth of realistic soil moisture data, which you can then view in the dashboard.
To run the frontend, navigate to the frontend folder and run npm run dev.

### Option 2: Run on a Raspberry Pi with the sensor
To collect live data from the soil moisture sensor, copy the following files to your Raspberry Pi:

- sensor_reader.py
- db_connection.py
- read_moisture.py
- requirements.py
- .env

On the Raspberry Pi, activate your virtual environment (python3 -m venv venv source venv/bin/activate). Next run pip install -r requirements.txt

Finally run: python sensor_reader.py to start the sensor readings. By default, the script is set to take a reading every hour. 

With the backend running navigate to the frontend folder and run npm run dev

## Hardware Required

- [Raspberry Pi 4 (any model with 40 pin header )](https://thepihut.com/products/raspberry-pi-4-model-b)  
- [XL Raspberry Pi 4 Heatsink](https://thepihut.com/products/xl-raspberry-pi-4-heatsink) 
- [Raspberry Pi 15W USB-C Power Supply](https://thepihut.com/products/raspberry-pi-psu-uk)  
- [SanDisk MicroSD Card)](https://thepihut.com/products/sandisk-microsd-card-class-10-a1)
- [Half-Size Breadboard](https://thepihut.com/products/raspberry-pi-breadboard-half-size)  
- [Premium Female/Male Jumper Wires”)](https://thepihut.com/products/premium-female-male-extension-jumper-wires-20-x-6)
- [Premium Male/Male Jumper Wires″](https://thepihut.com/products/premium-male-male-jumper-wires-20-x-6-150mm)  
- [Premium Female/Female Jumper Wires″](https://thepihut.com/products/premium-female-female-jumper-wires-40-x-6)  
- [MCP3008 – 8-Channel 10-Bit ADC](https://thepihut.com/products/mcp3008-8-channel-10-bit-adc-with-spi-interface)  
- [Capacitive Soil Moisture Sensor v2.0](https://thepihut.com/products/capacitive-soil-moisture-sensor)  

![20250726_185822](https://github.com/user-attachments/assets/d2d575ec-875e-4397-a51e-8762a96e1d41)


## Hardware Setup

PlantVue uses the **MCP3008 ADC** to read the analog signal from the capacitive moisture sensor and pass it to the Raspberry Pi via SPI.

### Connections

#### MCP3008 → Raspberry Pi (SPI interface)
- **VDD → 3.3V (Pin 1)**
- **VREF → 3.3V (Pin 1)**
- **AGND → GND (Pin 6)**
- **DGND → GND (Pin 9)**
- **CLK → GPIO11 / SCLK (Pin 23)**
- **DOUT → GPIO9 / MISO (Pin 21)**
- **DIN → GPIO10 / MOSI (Pin 19)**
- **CS/SHDN → GPIO8 / CE0 (Pin 24)**

#### Moisture Sensor → MCP3008
- **Sensor VCC → 3.3V (same rail as VDD)**
- **Sensor GND → GND**
- **Sensor OUT → CH0 (Pin 1 on MCP3008)**

### SPI Enable
Make sure SPI is enabled on the Raspberry Pi by running sudo raspi-config

### Running Raspberry Pi Headlessly

If you're setting up your Raspberry Pi without a monitor, keyboard, or mouse, this guide walks you through flashing the OS and enabling SSH for remote access:
[How to set up Raspberry Pi headlessly](https://www.tomshardware.com/reviews/raspberry-pi-headless-setup-how-to,6028.html)


## Future Developments

- **Plant-specific moisture thresholds:** Currently, the app uses general moisture thresholds (`OK`, `Drying`, `Dry`) suitable for most houseplants. These thresholds were tested and calibrated to ensure they reflect realistic soil moisture conditions. Future versions will allow users to select their specific plant, dynamically adjusting these thresholds for more accurate alerts for that specific plant.
- **Email notifications:** Implementing email alerts to notify users when a plant needs watering.  
- **Multi-sensor support:** Enabling the system to monitor multiple plants simultaneously.
- **Light sensor integration:** Track sunlight exposure for plants and integrate a plant API to get ideal light hours for each plant and set alerts accordingly.  
