const mongoose = require("mongoose");   

const deviceSchema = mongoose.Schema({
    name: {
        type: String
    },
    deviceId: {
        type: String
    },
    status: { //On, Off, Disabled
        type: String
    },
    users: {
        type: Array
    },
    fault: {
        type: String
    },
    technician: {
        type: String
    },
    supervisor: {
        type: String
    },
    secondSupervisor: {
        type: String
    }, 
    contactPerson: {
        type: String
    },
    mobile: {
        type: String
    },
    secondaryMobile: {
        type: String
    },
    email: {
        type: String
    },
    secondaryEmail: {
        type: String
    },
    thirdEmail: {
        type: String
    },
    address: {
        type: String
    },
    timestamps: {
        type: Number
    },
    localTime: {
        type: String
    },
	postalCode: String,
    country: {
		type: String
	},
	town: {
		type: String
	},
	province: {
		type: String
	},
	notes: {
		type: String
	}

}, { timestamps: true });

exports.deviceSchema = deviceSchema;
exports.Device = mongoose.model("Devices", deviceSchema);