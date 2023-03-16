const { CustomAPIError } = require("../errors/custom-error")

const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({msg: error.message})
  }
  res.status(500).json({msg: (error.message || 'Something went wrong. Please retry')})
}

module.exports = errorHandlerMiddleware
