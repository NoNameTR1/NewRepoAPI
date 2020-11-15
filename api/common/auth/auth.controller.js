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
