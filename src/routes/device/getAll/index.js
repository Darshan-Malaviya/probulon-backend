const { sendResponse, messages } = require("../../../helpers/handleResponse");
const Joi = require("joi");
const { ObjectId } = require("mongodb");
const { Device } = require("../../../models/device.model");
const makeMongoDbServiceDevice = require("../../../services/db/dbService")({
	model: Device,
});

exports.handler = async (req, res) => {
  try {
    let meta = {};
    let deviceList = [];
    const pageNumber = parseInt(req.query.pageNumber);
    const pageSize = parseInt(req.query.pageSize);
    const skip = pageNumber === 1 ? 0 : parseInt((pageNumber - 1) * pageSize);

    deviceList = await makeMongoDbServiceDevice.getDocumentByCustomAggregation([
      {
        $match: {
          // status: parseInt(req.query.status),
        },
      },
      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ]);
    const deviceCount = await makeMongoDbServiceDevice.getCountDocumentByQuery({
      // status: parseInt(req.query.status),
    });
    meta = {
      pageNumber,
      pageSize,
      totalCount: deviceCount,
      prevPage: parseInt(pageNumber) === 1 ? false : true,
      nextPage:
        parseInt(deviceCount) / parseInt(pageSize) <= parseInt(pageNumber)
          ? false
          : true,
      totalPages: Math.ceil(parseInt(deviceCount) / parseInt(pageSize)),
    };
    return sendResponse(res,null,200,messages.successResponse(deviceList, meta)
    );
  } catch (error) {
    return sendResponse(res,null,500,messages.failureResponse())
  }
};

exports.rule = Joi.object({
  pageNumber: Joi.number().optional().default(1).description("PageNumber"),
  pageSize: Joi.number().optional().default(20).description("PageNumber"),
});
