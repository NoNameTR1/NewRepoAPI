module.exports = function VaildationError(message, customError) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  // eslint-disable-next-line quotes
  this.message = message || `Validation error.`;
  this.statusCode = 401;
  this.errorCode = customError.errorCode;
};

require('util').inherits(module.exports, Error);
