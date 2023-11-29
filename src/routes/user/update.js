const { sendResponse, messages } = require("../../helpers/handleResponse")
const Joi = require('joi')
const { ObjectId } = require('mongodb');
const { User } = require("../../models/user.model");
const makeMongoDbServiceUser = require("../../services/db/dbService")({
	model: User,
});

exports.handler = async (req, res) => {
    let getUser = await makeMongoDbServiceUser.getSingleDocumentByQuery(
        { _id: new ObjectId(req.body.userId)}
      )

    if(!getUser) return sendResponse(res, null, 404,messages.recordNotFound())
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

    let newData = {
        firstName: req.body.firstName ? req.body.firstName : undefined, 
        lastName: req.body.lastName ? req.body.lastName : undefined,
        email: req.body.email ? req.body.email : undefined,
        deviceId: req.body.deviceId ? req.body.deviceId : undefined,
        password: req.body.password ? req.body.password : undefined,
        gender: req.body.gender ? genderArr[req.body.gender] : undefined,
        genderType: req.body.gender ? req.body.gender : undefined,
        userType: req.body.userType ? req.body.userType : undefined,
        userTypeText: req.body.userType ? userTypeArr[req.body.userType] : undefined,
        clientId: req.body.clientId ? req.body.clientId : undefined,
        status: req.body.status ? req.body.status : undefined,
        statusText: req.body.status ? req.body.status === 1 ? 'Active' : 'Deleted' : undefined,
    }
    newData = JSON.parse(JSON.stringify(newData))
    await makeMongoDbServiceUser.updateDocument(req.body.userId, { $set: newData })
    return sendResponse(res, null, 200,messages.successResponse("Updated Sucessfully."))
}

exports.rule = Joi.object({
    userId: Joi.string().required().description('userId'),
    firstName: Joi.string().optional().example('John').description('First Name of User'),
	lastName: Joi.string().optional().example('Doe').description('Last Name of User'),
	email: Joi.string().optional().example('john@example.com').description('Email of User'),      
	deviceId: Joi.string().optional().min(24).max(24).example('John').description('DeviceId of User'),
	password: Joi.string().optional().example('John').description('password of User'),   
	gender: Joi.number().optional().valid(1,2,3).example(1).description('gender of User: 1- Male, 2- Female, 3- Other'),
	userType: Joi.number().optional().valid(1,2,3).example('John').description('UserType: 1 - client, 2 - user, 3 - admin'),
	clientId: Joi.string().optional().allow('').when('userType', { is: 2, then: Joi.required()}),
    status: Joi.number().optional().valid(1,2).description('User Sataus: 1. Active, 2. Deleted')
})