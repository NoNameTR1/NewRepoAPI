import container from '~plugins';
import { genericErrorHandler } from '~errors';

export async function getUserById(req, res) {
  try {
    const result = await container.userService.userHandler.getUserById(
      req.params.id
    );
    return res.send(result);
  } catch (err) {
    const { status, response } = genericErrorHandler(err, err.stack);
    return res.status(status).json(response);
  }
}
