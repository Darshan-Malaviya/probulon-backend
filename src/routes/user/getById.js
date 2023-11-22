const { sendResponse, messages } = require("../../helpers/handleResponse")
const Joi = require('joi')
const { ObjectId } = require('mongodb');
const { User } = require("../../models/user.model");
const makeMongoDbServiceUser = require("../../services/db/dbService")({
	model: User,
});

exports.handler = async (req, res) => {
    let getUser = await makeMongoDbServiceUser.getSingleDocumentByQuery(
        { _id: new ObjectId(req.query.userId)}
      )

    if(!getUser) return sendResponse(res, null, 404,messages.recordNotFound())
    const { password , __v, ...userData} = getUser._doc
    return sendResponse(res, null, 200,messages.successResponse(userData))
}

exports.rule = Joi.object({
    userId: Joi.string().required().description('userId')
})