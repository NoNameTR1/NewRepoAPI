// config/security folder will be used as middleware folder 
// import { roleUserMiddleware } from './config/security';
// import passport from 'passport';

export default function (app) {
  const apiVersion = 'v1';
  const baseUrl = `/api/${apiVersion}`;

  // const authenticator = passport.authenticate('jwt', { session: false });
  // Mount common routes
  app.use(baseUrl, require('./api/common/general'));
  app.use(`${baseUrl}/user`, require('./api/common/membership'));
  app.use(`${baseUrl}/auth`, require('./api/common/auth'));

}
