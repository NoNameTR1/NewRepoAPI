module.exports = function UnprocessableEntity(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Unprocessable Entity';
  this.statusCode = 422;
  this.errorCode = errorCode || 422;
};

require('util').inherits(module.exports, Error);
