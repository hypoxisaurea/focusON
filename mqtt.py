#publisher/subscriber

import time
import paho.mqtt.client as mqtt
import circuit
import pygame
import pygame.mixer

def on_connect(client, userdata, flag, rc):
	client.subscribe("led", qos=0)

def on_message(client, userdata, msg):
	msg = int(msg.payload);
	circuit.controlLED(msg)

##########################################################################

broker_ip = "localhost"

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

##########################################################################

client.connect(broker_ip, 1883)
client.loop_start()

while(True):
	#조도
	illum = circuit.getIlluminance()
	client.publish("illum", illum, qos=0)

	#led
	light = circuit.light()
	client.publish("led", light, qos=0)

	#온도
	temp = circuit.getTemperature()
	client.publish("temp", temp, qos=0)

	#습도
	hum = circuit.getHumidity()
	client.publish("hum", hum, qos=0)

	#거리
	distance = circuit.measureDistance()
	client.publish("ultrasonic", distance, qos=0)

	#알람
	alarm = circuit.alarm()
	if (distance > 30):
		client.publish("alarm", alarm, qos=0)
		circuit.sounds()

	time.sleep(1)

client.loop_stop()
client.disconnect()