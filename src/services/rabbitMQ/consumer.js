const amqp = require("amqplib");

exports.consumer = async (queue, res) => {
    try {
      const conn = await amqp.connect("amqp://user:user123@79.143.90.196:5672", "heartbeat=60");
      const ch = await conn.createChannel()
      await conn.createChannel();
      await ch.assertQueue(queue, {durable: false});
      return ch.consume(queue, function (msg) {
        console.log('Received : ' + 'Queue : [%s] :', queue, msg.content.toString());
        // res.send(msg.content.toString())
        ch.ack(msg);
        });
    } catch (error) {
      console.log('Error : AMQP : Consume :', error);
    }
  }