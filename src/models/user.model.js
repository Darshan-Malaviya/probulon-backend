/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	deviceId: {
		type: String,
		required: true
	},
	clientId: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	gender: {
		type: String
	},
	genderType: {
		type: Number
	},
	isAdmin: {
		type: Boolean,
        default: false
	},
	status: {
		type: Number,
		minlength: 1,
		maxlength: 1,
	},
	statusText: {
		type: String
	},
	userType: {
		type: Number,
		min: 1,
		max: 1
	}
}, { timestamps: true });

exports.userSchema = userSchema;
exports.User = mongoose.model("User", userSchema);
