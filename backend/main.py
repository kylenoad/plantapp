import time
from read_moisture import read_moisture, cleanup
from db_utils import insert_reading
import os
from dotenv import load_dotenv

load_dotenv(".env.prod") 

try:
    while True:
        moisture = read_moisture()
        insert_reading(moisture)
        time.sleep(60)
finally:
    cleanup()
