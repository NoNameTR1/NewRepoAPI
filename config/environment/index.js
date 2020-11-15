'use strict';
/*eslint no-process-env:0*/

const path = require('path');
const _ =  require('lodash');

// All configurations will extend these options
// ============================================
var all = {
 // env: process.env.NODE_ENV || 'development',

  // Root path of server
  root: path.normalize(`${__dirname}/../..`),

  // Server port
  port: process.env.PORT || 3000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Secret for session, you will want to change this and make it an environment variable
  // secrets: {
  //   session: 'emre-secret',
  // },
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared')
);
