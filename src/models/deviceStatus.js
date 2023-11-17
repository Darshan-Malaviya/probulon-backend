const mongoose = require("mongoose");

const deviceStatusSchema = mongoose.Schema({
    bettery: Number,
    isTempered: Boolean
}, { timestamps: true })
exports.deviceStatus = mongoose.model('deviceStatus', deviceStatusSchema);