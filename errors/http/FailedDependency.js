module.exports = function FailedDependency(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Failed Dependency';
  this.statusCode = 424;
  this.errorCode = errorCode || 424;
};

require('util').inherits(module.exports, Error);
