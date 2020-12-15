import container from '~plugins';
import { genericErrorHandler } from '~errors';

/*
    SESSION ---------------------------------------------------------------------------------------
 */

export async function login(req, res) {
  try {
    let data = await container.membershipService.loginHandler.login(req.body);
    return res.send(data);
  } catch (e) {
    const { status, response } = genericErrorHandler(e, e.stack);
    return res.status(status).json(response);
  }
}

export async function register(req,res){
  try
  {
    console.log(req.body);
    const data = await container.membershipService.registerHandler.register(req.body);
    return res.send(data);
  }catch(e){
    const { status, response } = genericErrorHandler(e, e.stack);
    return res.status(status).json(response);
  }
}

export async function refreshToken(req, res, next) {
  const { refreshToken } = req.body;

  try {
    let result = await container.membershipService.sessionHandler.refresh(refreshToken);
    return res.json(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
