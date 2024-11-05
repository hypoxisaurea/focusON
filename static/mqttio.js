var port = 9001
var client = null;


function startConnect() { 
   clientID = "clientID-" + parseInt(Math.random() * 100);
   broker = document.getElementById("broker").value;

   client = new Paho.MQTT.Client(broker, Number(port), clientID);
   client.onConnectionLost = onConnectionLost;
   client.onMessageArrived = onMessageArrived; 

   client.connect({
      onSuccess: onConnect,
   });
}


var isConnected = false;
function onConnect() { 
   isConnected = true;
   document.getElementById("hello").innerHTML += '<span>Connected</span><br/>';
}


var topicSave;
function subscribe(topic) {
   if(client == null) return;
   if(isConnected != true) {
      topicSave = topic;
      window.setTimeout("subscribe(topicSave)", 500);
      return
   }
   document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';
   client.subscribe(topic);
}


function publish(topic, msg) {
   if(client == null) return; 
   client.send(topic, msg, 0, false);
}

function unsubscribe(topic) {
   if(client == null || isConnected != true) return;
   document.getElementById("messages").innerHTML += '<span>Unsubscribing to: ' + topic + '</span><br/>';
   client.unsubscribe(topic, null);
}


function onConnectionLost(responseObject) {
   document.getElementById("messages").innerHTML += '<span>오류 : 접속 끊어짐</span><br/>';
   if (responseObject.errorCode !== 0) {
      document.getElementById("messages").innerHTML += '<span>오류 : ' + + responseObject.errorMessage + '</span><br/>';
   }
}

function onMessageArrived(msg) {
   console.log("onMessageArrived: " + msg.payloadString);

   if(msg.destinationName == "illum"){
      i_addChartData(parseFloat(msg.payloadString));
   }
   else if(msg.destinationName == "ultrasonic"){
      d_addChartData(parseFloat(msg.payloadString)); 
   }
   else if (msg.destinationName == "temp"){
      t_addChartData(parseFloat(msg.payloadString));
   }
   else if (msg.destinationName == "hum"){
      h_addChartData(parseFloat(msg.payloadString));
   }
   else if (msg.destinationName == "alarm"){
   	  document.getElementById("alarm").innerHTML += '<span>' + msg.payloadString + '</span><br/>';
   }
}


function startDisconnect() {
   client.disconnect();
   document.getElementById("hello").innerHTML += '<span>Disconnected</span><br/>';
}