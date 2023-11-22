const Joi = require("joi");
const { sendResponse, messages} = require("../../helpers/handleResponse");
const { User } = require("../../models/user.model");
const makeMongoDbServiceUser = require("../../services/db/dbService")({
	model: User,
});

exports.create = async (req, res) => {
	try {
		let email = req.body.email
		let clientId = req.body.clientId
		let user = await makeMongoDbServiceUser.getSingleDocumentByQuery({email,},[]);

        if (user) {
			return sendResponse(res, null, 400, messages.isDuplicate())
		}

		user = await makeMongoDbServiceUser.getDocumentById(clientId)

		if (req.body.userType === 2 && !user) {
			return sendResponse(res, null, 400, messages.recordNotFound())
		}
		const genderArr = {
			1: "Male",
			2: "Female",
			3: "Other"
		}
		const userData = req.body;
		userData.status = 1 // 1- active, 2- deleted
		userData.statusText = "Active"
		userData.genderType = userData.gender
		userData.gender = genderArr[userData.genderType]
		const newUser = await makeMongoDbServiceUser.createDocument(userData);
		const { password, __v, ...newUserData} = newUser._doc
		return sendResponse(res, null, 200, messages.successResponse(newUserData))
	} catch (error) {
		console.log(error);
        return sendResponse(res, null, 500, messages.failureResponse(error))
	}
};

exports.rule = Joi.object({
	firstName: Joi.string().required().example('John').description('First Name of User'),
	lastName: Joi.string().required().example('Doe').description('Last Name of User'),
	email: Joi.string().required().example('john@example.com').description('Email of User'),      
	deviceId: Joi.string().required().min(24).max(24).example('John').description('DeviceId of User'),
	password: Joi.string().required().example('John').description('password of User'),   
	gender: Joi.number().required().valid(1,2,3).example(1).description('gender of User: 1- Male, 2- Female, 3- Other'),
	userType: Joi.number().required().valid(1,2,3).example('John').description('UserType: 1 - client, 2 - user, 3 - admin'),
	clientId: Joi.string().optional().allow('').when('userType', { is: 2, then: Joi.required()})
})