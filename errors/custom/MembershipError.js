module.exports = function MembershipError(message, customError) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  // eslint-disable-next-line quotes
  this.message = message || customError.message;
  this.statusCode = customError.statusCode;
  this.errorCode = customError.errorCode;
};

require('util').inherits(module.exports, Error);
