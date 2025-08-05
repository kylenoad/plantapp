import time
from read_moisture import read_moisture, cleanup
from db_utils import insert_reading

try:
    while True:
        moisture = read_moisture()
        insert_reading(moisture)
        time.sleep(60)
finally:
    cleanup()
