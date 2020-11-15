import morgan from 'morgan';
import winston from './winston';
import cors from 'cors';
import bodyParser from 'body-parser';
import userAgent from 'express-useragent';
import config from './environment';

export default function (app) {
  const env = app.get('env');
  const isDevelopment = env === 'development';

  // Load .env file if we're on development
  if (isDevelopment) {
    require('dotenv').config();
  }

  app.use(
    cors({
      origin: false, // CORS is disabled for now.
      optionsSuccessStatus: 200,
      allowedHeaders: ['Content-Type', 'Authorization', 'Client-Id', 'hmac'],
    })
  );

  // Setup logging //todo: open
  if (isDevelopment) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined', { stream: winston.stream }));
  }

  app.use(bodyParser.json());

  app.set('json spaces', 2);

  // Remove X-Powered-By header.
  app.set('x-powered-by', false);

  // Get user agent information.
  app.use(userAgent.express());

  // Check Client-Id header.
  app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Client-Id'
    );
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    } else {
      var clientId = req.header('Client-Id');

      if (clientId && config.clientIds.indexOf(clientId) !== -1) {
        next();
      } else {
        // Sending this, we don't want anyone to
        // guess what's wrong if they called our API
        // without a Client-Id
        return res.status(400).send();
      }
    }
  });
}
