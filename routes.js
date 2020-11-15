//import { roleUserMiddleware } from './config/security';

export default function (app) {
  const apiVersion = 'v1';
  const baseUrl = `/api/${apiVersion}`;

  // app.use((req,res,next) => {
  //   console.log(req);
  //   new BaseLog(req.body, 'logs_request:rest', new Date())
  // })

  // Mount common routes
  app.use(baseUrl, require('./api/common/general'));
  app.use(`${baseUrl}/auth`, require('./api/common/auth'));
}
