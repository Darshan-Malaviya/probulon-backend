const { sendResponse, messages } = require("../../../helpers/handleResponse");
const Joi = require("joi");
const { ObjectId } = require("mongodb");
const { Device } = require("../../../models/device.model");
const makeMongoDbServiceDevice = require("../../../services/db/dbService")({
	model: Device,
});


exports.handler = async (req, res) => {
    try {
        return sendResponse(res, null, 200, messages.successResponse());
      } catch (error) {
        return sendResponse(res, null, 500, messages.failureResponse());
      }
};

exports.rule = Joi.object({
  deviceId: Joi.string().required().description("deviceId"),
});
