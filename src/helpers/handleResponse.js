const sendResponse = (response, headers = null, status, data) => {
	if(headers && headers !== '') {
		return response.set(headers).status(status).send(data);
	}
	return response.set({ "Content-Type" : "application/json"}).status(status).send(data);
};

let messages = {}
messages.successResponse = (data, meta = {}) => ({
    status: 'SUCCESS',
    message: 'Your request is successfully executed',
    data,
    meta
});
messages.failureResponse = (data) => ({
    status: 'FAILURE',
    message: 'Internal Server Error',
    data: {}
});
messages.badRequest = (data) => ({
    status: 'BAD_REQUEST',
    message: 'The request cannot be fulfilled due to bad syntax',
    data: {}
});

messages.isDuplicate = (data) => ({
    status: 'VALIDATION_ERROR',
    message: 'Data duplication Found',
    data: {}
});

messages.isAssociated = (data = {}) => ({
    status: 'CONFLICT',
    message: 'Authentication data are already associated with another account.',
    data
});

messages.recordNotFound = (data = {}) => ({
    status: 'RECORD_NOT_FOUND',
    message: 'Record not found with that criteria.',
    data
});
messages.insufficientParameters = () => ({
    status: 'BAD_REQUEST',
    message: 'Insufficient parameters',
    data: {}
});

messages.mongoError = (error) => ({
    status: 'FAILURE',
    message: 'Mongo db related error',
    data: {}
});
messages.inValidParam = (error) => ({
    status: 'VALIDATION_ERROR',
    message: error,
    data: {}
});

messages.unAuthorizedRequest = (error) => ({
    status: 'UNAUTHORIZED',
    message: 'You are not authorized to access the request',
    data: {}
});

messages.loginSuccess = (data) => ({
    status: 'SUCCESS',
    message: 'Login Successful',
    data
});
messages.passwordEmailWrong = () => ({
  data: {
    status: 'BAD_REQUEST',
    message: 'Incorrect mobile phone number or password',
    data: {},
  },
});
messages.adminPasswordEmailWrong = () => ({
    status: 'BAD_REQUEST',
    message: 'Incorrect mobile phone number or password',
    data: {}
});
messages.loginFailed = (error) => ({
    status: 'BAD_REQUEST',
    message: `Login Failed, ${error}`,
    data: {}
});
messages.failedSoftDelete = () => ({
    status: 'FAILURE',
    message: 'Data can not be soft deleted due to internal server error',
    data: {}
});
messages.invalidRequest = (data) => ({
    status: 'FAILURE',
    message: data,
    data: {}
});

messages.invalidRequestWithData = (message, data) => ({
    status: 'FAILURE',
    message: message,
    data: data
});
messages.requestValidated = (data) => ({
    status: 'SUCCESS',
    message: data,
    data: {}
});
messages.requestValidatedWithData = (message, data, meta = {}) => ({
    status: 'SUCCESS',
    message,
    data,
    meta
});


module.exports = { sendResponse, messages};
