module.exports = function NotFound(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  // eslint-disable-next-line quotes
  this.message = message || `The requested resource couldn't be found`;
  this.statusCode = 404;
  this.errorCode = errorCode || 404;
};

require('util').inherits(module.exports, Error);
