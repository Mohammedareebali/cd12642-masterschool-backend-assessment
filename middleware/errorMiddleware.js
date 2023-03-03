const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
  
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Authorization Error';
    }
  
    if (err instanceof TypeError || err instanceof ReferenceError) {
      statusCode = 400;
      message = 'Bad Request';
    }
  
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      statusCode = 422;
      message = 'Validation Error';
    }
  
    if (err.name === 'MongoError' && err.code === 11000) {
      statusCode = 422;
      message = 'Duplicate Key Error';
    }
  
    const errorResponse = {
      status: 'error',
      statusCode,
      message
    };
  
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }
  
    res.status(statusCode).json(errorResponse);
  }
  
  module.exports = errorHandler;
  