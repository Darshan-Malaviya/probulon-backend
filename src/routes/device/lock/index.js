
const { ObjectId } = require('mongodb');
const { User } = require("../../../models/user.model");
const { Device } = require("../../../models/device.model");
const { sendResponse, messages } = require('../../../helpers/handleResponse');
const Joi = require('joi');
const makeMongoDbServiceUser = require("../../../services/db/dbService")({
	model: User
});
const makeMongoDbServiceDevice = require("../../../services/db/dbService")({
	model: Device
});

exports.getLockStatus = (req, res) => {
	const userId = req.user.id;
	const deviceId = req.body.deviceId;
	const deviceData = makeMongoDbServiceDevice.getSingleDocumentByQuery({ deviceId: deviceId, users: { $in: [userId] } });

	return sendResponse(
		res,
		null,
		200,
		messages.successResponse(deviceData)
	);
}

exports.updateLockStatusBy = (req, res) => {
	const userId = req.user.id;
	const deviceId = req.body.deviceId;
	const updateLockStatusBy = req.body.updateLockStatusBy;
	const deviceData = makeMongoDbServiceDevice.findOneAndUpdateDocument(
		{ deviceId: deviceId, users: { $in: [userId] } },
		{ updateLockStatusBy: updateLockStatusBy },
		{ new: true }
	);

	return sendResponse(
		res,
		null,
		200,
		messages.successResponse(deviceData)
	);
}

exports.updateLockStatus = (req, res) => {
	const userId = req.user.id;
	const deviceId = req.body.deviceId;
	const deviceData = makeMongoDbServiceDevice.findOneAndUpdateDocument(
		{ deviceId: deviceId, users: { $in: [userId], updateLockStatusBy: "Manual" } },
		{ $bit: { isLocked: { xor: 1 } } },
		{ new: true }
	);

	return sendResponse(
		res,
		null,
		200,
		messages.successResponse(deviceData)
	);
}

exports.updateLockStatusByValidationRule = Joi.object({
	deviceId: Joi.string().required().description("deviceId"),
	updateLockStatusBy: Joi.string().valid("Manual", "Automatic").required().description("updateLockStatusBy"),
})

exports.rule = Joi.object({
	deviceId: Joi.string().required().description("deviceId")
})