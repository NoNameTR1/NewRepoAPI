module.exports = function NetworkAuthenticationRequired(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Network Authentication Required';
  this.statusCode = 511;
  this.errorCode = errorCode || 511;
};

require('util').inherits(module.exports, Error);
