var express = require("express");
const amqp = require("amqplib");
var app = express();

const queue = "test_queue";
const text = {
    item_id: "macbook",
    text: "This is a sample message to send receiver to check the ordered Item Availablility",
  };

async function sendData() {
    let connection;
    try {
      connection = await amqp.connect("amqp://user:user123@79.143.90.196:5672");
      const channel = await connection.createChannel();
  
      await channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
      console.log(" [x] Sent '%s'", text);
      await channel.close();
    } catch (err) {
      console.warn(err);
    } finally {
      if (connection) await connection.close();
    }
}

app.get("/send-msg", async (req, res) => {
    sendData();
    res.send("Message Sent"); //response to the API request
    
})

app.get("/", function (req, res) {
    res.send("Hello world!");   
});

app.listen(3000);
