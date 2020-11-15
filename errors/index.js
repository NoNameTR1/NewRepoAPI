import fs from 'fs';
const httpErrors = fs.readdirSync(__dirname + '/http');
const customErrors = fs.readdirSync(__dirname + '/custom');

httpErrors.forEach(function (el) {
  var n = el.substring(0, el.indexOf('.'));
  module.exports[n] = require('./http/' + el);
});

customErrors.forEach(function (el) {
  var n = el.substring(0, el.indexOf('.'));
  module.exports[n] = require('./custom/' + el);
});

// Export error codes
export { default as ErrorCodes } from './codes';

// Export error handlers
export { validationErrorHandler } from './handlers/validation';
export { genericErrorHandler } from './handlers/generic';
