const { sendResponse, messages } = require("../../../helpers/handleResponse");
const Joi = require("joi");
const { User } = require("../../../models/user.model");
const makeMongoDbServiceUser = require("../../../services/db/dbService")({
  model: User,
});
exports.handler = async (req, res) => {
  try {
    let meta = {};
    let userList = [];
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);
    const skip = pageNumber === 1 ? 0 : parseInt((pageNumber - 1) * pageSize);

    userList = await makeMongoDbServiceUser.getDocumentByCustomAggregation([
        {
            $match: {
                status: parseInt(req.query.status)
            }
        },{
            $project: {
                password: 0,
                __v: 0
            }
        },
        { $sort: { _id: -1 } },
        { $skip: skip },
        { $limit: pageSize },
    ])
    const userCount = await makeMongoDbServiceUser.getCountDocumentByQuery({ status: parseInt(req.query.status) });
    meta = {
      pageNumber,
      pageSize,
      totalCount: userCount,
      prevPage: parseInt(pageNumber) === 1 ? false : true,
      nextPage:
        parseInt(userCount) / parseInt(pageSize) <= parseInt(pageNumber)
          ? false
          : true,
      totalPages: Math.ceil(parseInt(userCount) / parseInt(pageSize)),
    };
    return sendResponse(res,null,200,messages.successResponse(userList, meta));
  } catch (error) {
    return sendResponse(res,null,500,messages.failureResponse())
  }
};

exports.rule = Joi.object({
    status: Joi.number().valid(1,2).optional().default(1).description('1 - active, 2- deleted'),
    pageNumber: Joi.number().optional().default(1).description('PageNumber'),
    pageSize: Joi.number().optional().default(20).description('PageNumber'),
})