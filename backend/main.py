import time
from read_moisture import read_moisture, cleanup
from db_utils import insert_reading
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv(".env.prod")
print(dotenv_values(".env.prod"))
print("DATABASE_URL =", os.getenv("DATABASE_URL"))

try:
    while True:
        moisture = read_moisture()
        insert_reading(moisture)
        print(f"Inserted moisture reading: {moisture}")
        time.sleep(3600) 
finally:
    cleanup()

