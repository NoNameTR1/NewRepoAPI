// config/security folder will be used as middleware folder 
//import { roleUserMiddleware } from './config/security';

export default function (app) {
  const apiVersion = 'v1';
  const baseUrl = `/api/${apiVersion}`;

  // Mount common routes
  app.use(baseUrl, require('./api/common/general'));
  app.use(`${baseUrl}/user`, require('./api/common/membership'));
  app.use(`${baseUrl}/auth`, require('./api/common/auth'));
}
