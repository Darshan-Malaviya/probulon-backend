const bodyParser = require("body-parser");
const express = require("express");

module.exports = function (app) {
    app.use(express.json());
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
}