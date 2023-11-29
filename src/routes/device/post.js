const Joi = require("joi");
const { sendResponse, messages} = require("../../helpers/handleResponse");


exports.create = async (req, res) => {
	try {
		return sendResponse(res, null, 200,messages.successResponse())
	} catch (error) {
		console.log(error);
        return sendResponse(res, null, 500, messages.failureResponse(error))
	}
};

exports.rule = Joi.object({
})