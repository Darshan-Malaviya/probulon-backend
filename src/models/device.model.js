const mongoose = require("mongoose");   

const deviceSchema = mongoose.Schema({
    name: {
        type: String
    },
    deviceId: {
        type: String
    },
    status: {
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
    secondaryMobile: {
        type: String
    },
    thirdEmail: {
        type: String
    },
    address: {
        type: String
    },
    timestamps: {
        type: Date
    },
    localTime: {
        type: String
    },
	postalCode: Number,
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
	},
    timestamp: {
        type: Date
    }

}, { timestamps: true });

exports.deviceSchema = deviceSchema;
exports.Device = mongoose.model("Devices", deviceSchema);