var express = require("express");
const { sendData } = require("./src/services/rabbitMQ/publisher");
const { consumer } = require("./src/services/rabbitMQ/consumer");
var app = express();
require("dotenv").config();
require('./config/config')(app)
require('./config/dbConfig')()
require('./config/consumer')()
require('./config/mqtt')(app)
require('./src/routes')(app)

const queue = "test_queue";
const text = {
  item_id: "macbook",
  text: "This Hello",
};

app.get("/send-msg", async (req, res) => {
    sendData(queue, text);
    sendData('device_status', {
      bettery: 10,
      isTempered: true
    });
    res.send("Message Sent"); //response to the API request
})

app.listen(3000,() => {
  console.log("server is running..");
});
