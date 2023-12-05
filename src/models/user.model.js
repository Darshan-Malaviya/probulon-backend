/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	clientId: {
		type: String,
		default: ""
	},
	collaborator: Number,
	collaboratorText: String,
	position: Number,
	positionText: String,
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	lastSurname: {
		type: String,
		required: true,
	},
	mobile: {
		type: String
	},
	secondaryMobile: {
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	secondaryEmail: {
		type: String,
		default: ""
	},
	status: {
		type: Number,
		minlength: 1,
		maxlength: 1,
	},
	statusText: {
		type: String
	},
	taxStatus: {
		type: Number,
		default: 0
	},
	taxStatusText: {
		type: String,
		default: ''
	},
	documentType: {
		type: Number
	},
	documentTypeText: {
		type: String
	},
	idNumber: {
		type: String
	},
	devices: {
		type: Array
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
	userType: { //1 - client, 2 - user, 3 - admin
		type: Number,
		min: 1,
		max: 1
	},
	userTypeText: { //1 - client, 2 - user, 3 - admin
		type: String
	},
	postalCode: Number,
	country: {
		type: String
	},
	town: {
		type: String
	},
	startDate: {
		type: Date
	},
	terminationDate: {
		type: Date
	},
	taxAddress: {
		type: String
	},
	notes: {
		type: String
	}
}, { timestamps: true });

exports.userSchema = userSchema;
exports.User = mongoose.model("User", userSchema);
