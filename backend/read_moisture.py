import spidev
import time

spi = spidev.SpiDev()
spi.open(0, 0)  
spi.max_speed_hz = 1000000  

def readData(channel):
    adc = spi.xfer2([1, (8 + channel) << 4, 0])
    data = ((adc[1] & 3) << 8) + adc[2]
    return data

try:
    while True:
        value = readData(0) 
        print(f"Sensor value: {value}")
        time.sleep(2) 
finally:
    spi.close()
