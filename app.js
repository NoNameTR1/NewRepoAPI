import express from 'express';
import http from 'http';

import logger from './config/winston';
import { genericErrorHandler } from './errors';
import container from './plugins';

const port = process.env.port || 4000;
const app = express();
const server = http.createServer(app);

const env = app.get('env');
const isDevelopment = env === 'development';
const isProduction = env === 'production';

const socketio = require('socket.io')(server);
app.set('port', port);

require('./aliases');


require('./config/express').default(app);

// Mount api routes
require('./routes').default(app);

require('./config/socket').default(socketio, app);

require('./config/database');

app.use((err, req, res) => {
  // Log to file if we're not in local.
  if (isDevelopment) {
    logger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }

  // Send exposeStackTrace option to true if
  // we're not on development. Don't expose stack trace to users, ever.
  genericErrorHandler(res, err, !isProduction);
});

// I am adding this as the last middleware
// and it's responsibility is to catch 404s only.
// The real error handler is just above.

app.use((req, res) => {
  res.status(404).send();
});

container
  .initialize()
  .then(() => {
    server.listen(port, () => {
      console.log('Service is working on : ' + port);
    });
  })
  .catch((e) => {
    console.error(e);
  });

module.exports = server;