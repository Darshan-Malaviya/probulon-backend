const Joi = require("joi");
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { sendResponse, messages} = require("../../../helpers/handleResponse");
const { User } = require("../../../models/user.model");
const makeMongoDbServiceUser = require("../../../services/db/dbService")({
	model: User,
});
const { Device } = require("../../../models/device.model");
const makeMongoDbServiceDevice = require("../../../services/db/dbService")({
	model: Device,
});

exports.handler = async (req, res) => {
	try {
		let email = req.body.email
		let deviceId = new ObjectId()
		req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUND))
		const genderArr = {
			1: "Male",
			2: "Female",
			3: "Other"
		}
		const userTypeArr = {
			1: "Client",
			2: "User",
			3: "Admin"
		}

		const positionMap = {
			1: "Executive",
			2: "Supervisor",
			3: "Salesperson",
			4: "Administration",
			5: "Technician"
		}

		const taxStatusMap = {
			1: "Individual",
			2: "Self-Employed",
			3: "Limited Company",
			4: "Public Limited Company",
			5: "General Partnership",
			6: "Community of Property"
		}

		const documentTypeMap = {
			1: "NIF (Tax ID Number)",
			2: "NIE (Foreigner Identification Number)",
			3: "CIF (Corporate Tax ID)"
		}

		let data = {
			name: req.body.name ? req.body.name : '',
			surname: req.body.surname ? req.body.surname : '',
			lastSurname: req.body.lastSurname ? req.body.lastSurname : '',
			mobile: req.body.mobile ? req.body.mobile : '',
			secondaryMobile: req.body.secondaryMobile ? req.body.secondaryMobile : '',
			secondaryMobile: req.body.secondaryMobile ? req.body.secondaryMobile : '',
			email: email,
			deviceId: deviceId,
			password: bcrypt.hashSync(userData.password, parseInt(process.env.SALT_ROUND)),
			gender: genderArr[req.body.gender],
			genderType: req.body.gender,
			userType: req.body.userType ? req.body.userType : '',
			userTypeText: userTypeArr[req.body.userType]

		}
		if(req.body.userType === 1) {

			const clientData = {
				userType: 1,
				name: req.body.name ? req.body.name : '',
				surname: req.body.surname ? req.body.surname : '',
				lastSurname: req.body.lastSurname ? req.body.lastSurname : '',
				mobile: req.body.mobile ? req.body.mobile : '',
				secondaryMobile: req.body.secondaryMobile ? req.body.secondaryMobile : '',
				secondaryMobile: req.body.secondaryMobile ? req.body.secondaryMobile : '',
				email: email,
				deviceId: deviceId,
				password: bcrypt.hashSync(userData.password, parseInt(process.env.SALT_ROUND)),
				gender: genderArr[req.body.gender],
				genderType: req.body.gender,
				userType: req.body.userType ? req.body.userType : '',
				userTypeText: userTypeArr[req.body.userType],
			}
		} else if(req.body.userType === 2) {
			const userData = {
				position
			}
		}
		


















		// let userId = new ObjectId()
		// let clientId = req.body.clientId ? req.body.clientId : '' 
		// let deviceId = req.body.deviceId
		// delete req.body.deviceId

		// if(deviceId) {
		// 	await makeMongoDbServiceDevice.updateDocument(new ObjectId(deviceId), {
		// 		$push: {
		// 			users: userId
		// 		}
		// 	})
		// }
		// let user = await makeMongoDbServiceUser.getSingleDocumentByQuery({email,},[]);

        // if (user) {
		// 	return sendResponse(res, null, 400, messages.isDuplicate())
		// }

		// user = await makeMongoDbServiceUser.getDocumentById(clientId)

		// if (req.body.userType === 2 && !user) {
		// 	return sendResponse(res, null, 400, messages.recordNotFound())
		// }

		// const userData = req.body;
		// userData.password = bcrypt.hashSync(userData.password, parseInt(process.env.SALT_ROUND))
		// userData.status = 1 // 1- active, 2- deleted
		// userData.statusText = "Active"
		// userData.genderType = userData.gender
		// userData.gender = genderArr[userData.genderType]
		// userData.userTypeText = userTypeArr[req.body.userType] 
		// userData.positionText = positionMap[userData.position]
		// userData.collaboratorText = userData.collaborator === 1 ? "Exclusive" : "Occasional"
		// userData.taxStatusText = taxStatusMap[userData.taxStatus]
		// userData.documentTypeText = documentTypeMap[userData.documentType]
		// userData.devices = [userData]
		// const newUser = await makeMongoDbServiceUser.createDocument(userData);
		// const { password, __v, ...newUserData} = newUser._doc
		// return sendResponse(res, null, 200, messages.successResponse(newUserData._id))
	} catch (error) {
		console.log(error);
        return sendResponse(res, null, 500, messages.failureResponse(error))
	}
};

exports.rule = Joi.object({
	name: Joi.string().required().example('John').description('First Name of User'),
	surname: Joi.string().required().example('Doe').description('Surname of User'),
	lastSurname: Joi.string().optional().allow('').example('Doe').description('Last Surname of User'),
	mobile: Joi.string().required().example('9876543210').description('Mobile of User'),
	secondaryMobile: Joi.string().optional().allow('').example('9876543210').description('Second Mobile of User'),
	email: Joi.string().required().example('john@example.com').description('Email of User'),     
	secondaryEmail: Joi.string().optional().allow('').example('john@example.com').description('Email of User'),
	deviceId: Joi.string().optional().allow('').min(24).max(24).example('John').description('DeviceId of User').when('userType', { is: 2, then: Joi.required()}),
	password: Joi.string().required().example('John').description('password of User'),   
	gender: Joi.number().required().valid(1,2,3).example(1).description('gender of User: 1- Male, 2- Female, 3- Other'),
	userType: Joi.number().required().valid(1,2,3).example(1).description('UserType: 1 - client, 2 - user, 3 - admin'),
	position: Joi.number().required().valid(1,2,3,4,5).example(1).description('Position Type: 1 - Executive, 2 - Supervisor, 3 - Salesperson, 4 - Administration, 5 - Technician'),
	collaborator: Joi.number().optional().allow('').valid(1,2).example(1).description('Collaborator Type: 1 - Exclusive, 2 - Occasional'),
	clientId: Joi.string().optional().allow('').when('userType', { is: 2, then: Joi.required()}),
	taxStatus: Joi.number().optional().valid(1,2,3,4,5,6).description('Tax Status 1- Individual,2- Self-Employed,3- Limited Company,4- Public Limited Company,5- General Partnership,6- Community of Property').example(1),
	postalCode: Joi.number().optional().description('Postal Code').example(1),
	country: Joi.string().optional().allow('').description('country').example('USA'),
	town: Joi.string().optional().allow('').description('town').example('town'),
	startDate: Joi.string().optional().description('Start Date').example('1-1-1970'),
	terminationDate: Joi.string().optional().description('Termination Date').example('1-1-1970'),
	documentType: Joi.number().required().valid(1,2,3).example(1).description('documentType: 1 - NIF (Tax ID Number), 2 - NIE (Foreigner Identification Number), 3 - CIF (Corporate Tax ID)'),
	idNumber: Joi.string().optional().allow('').description('Document Id Number').example('TAX123456'),
	taxAddress: Joi.string().optional().allow('').description('Address').example('India'),
	notes: Joi.string().optional().allow('').description('Notes').example('Notes')
})