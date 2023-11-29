var express = require("express");
var app = express();
require("dotenv").config();
require('./config/config')(app)
require('./config/dbConfig')()
require('./config/consumer')()
require('./config/mqtt')(app)
require('./src/routes')(app)

app.listen(3000,() => {
  console.log("server is running..");
});
