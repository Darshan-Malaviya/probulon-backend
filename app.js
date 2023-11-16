var express = require("express");
const { sendData } = require("./src/services/rabbitMQ/publisher");
const { consumer } = require("./src/services/rabbitMQ/consumer");
var app = express();
require('./src/routes')(app)

const queue = "test_queue";
const text = {
  item_id: "macbook",
  text: "This Hello",
};

app.get("/send-msg", async (req, res) => {
    sendData(queue, text);
    res.send("Message Sent"); //response to the API request
})

consumer(queue);

app.listen(3000,() => {
  console.log("server is running..");
});
