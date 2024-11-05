import time
import RPi.GPIO as GPIO
from adafruit_htu21d import HTU21D
import busio
import Adafruit_MCP3008

from datetime import datetime
import pygame
import pygame.mixer

##########################################################################

#초음파 파트
trig = 20
echo = 16

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(trig, GPIO.OUT)
GPIO.setup(echo, GPIO.IN)
GPIO.output(trig, False)

def measureDistance():
	global trig, echo
	GPIO.output(trig, True)
	time.sleep(0.0001)
	GPIO.output(trig, False)

	while(GPIO.input(echo) == 0):
		pass

	pulse_start = time.time()
	while(GPIO.input(echo) == 1):
		pass

	pulse_end = time.time()
	pulse_duration = pulse_end - pulse_start

	return 340*100/2*pulse_duration

#알람 파트
def alarm():
	now = datetime.now()
	dt_string = now.strftime("%Y/%m/%d  %H:%M:%S")
	string = "			집중!"
	fighting = dt_string + string

	return fighting

#음악 파트
button = 21
GPIO.setup(button, GPIO.IN, GPIO.PUD_DOWN)

def sounds():
	pygame.init()
	pygame.mixer.init()
	ring = "a.wav"
	pygame.mixer.music.load(ring)
	pygame.mixer.music.play()

	if(GPIO.input(button) == 1):
		pygame.mixer.music.stop()

##########################################################################

#조도 파트
def getIlluminance():
	mcp = Adafruit_MCP3008.MCP3008(clk=11, cs=8, miso=9, mosi=10)
	return int(mcp.read_adc(0))

#led 파트
led1 = 5
led2 = 6
GPIO.setup(led1, GPIO.OUT)
GPIO.setup(led2, GPIO.OUT)

def light():
	lightness = getIlluminance()

	if (lightness <= 200):
		return 0
	elif ((lightness > 200) and (lightness <400)):
		return 1
	elif (lightness > 400):
		return 2

def controlLED(onOff):
   if (onOff == 0):
      GPIO.output(led1, 1)
      GPIO.output(led2, 1)
   elif (onOff == 1):
      GPIO.output(led1, 1)
      GPIO.output(led2, 0)
   elif (onOff == 2):
      GPIO.output(led1, 0)
      GPIO.output(led2, 0)

##########################################################################

#온습도 파트
sda = 2
scl = 3
i2c = busio.I2C(scl, sda)
sensor = HTU21D(i2c)

def getTemperature() :
        return float(sensor.temperature)
        
def getHumidity() :
        return float(sensor.relative_humidity)