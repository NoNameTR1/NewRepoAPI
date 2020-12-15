import { membershipService } from '~services';

/**
 * GET: /api/v1/account/me
 * @param {*} req
 * @param {*} res
 */
export async function getCurrentUser(req, res) {
  try {
    const user = await membershipService.getUserForAuth(req.user.id);
    res.json(user);
  } catch (e) {
    console.log(e);
  }
}

/**
 * PUT: /api/v1/account/me
 * @param {*} req
 * @param {*} res
 */
export async function updateCurrentUser(req, res) {
  const { id } = req.user;
  const { bio, phone, fullName } = req.body;
  try {
    await membershipService.updateUser({ bio, phone, fullName }, id);
    res.send(true);
  } catch (err) {
    res.send(false);
  }
}

/**
 * PUT: /api/v1/account/password
 * @param {*} req
 * @param {*} res
 * @param next
 */
export async function changePassword(req, res, next) {
  try {
    const { password, currentPassword } = req.body;
    const userId = req.user.id;

    const user = await membershipService.getUserById(userId);

    const passwordValid = await user.verifyPassword(currentPassword);
    if (!passwordValid) {
      return next(new Error('wrong_password'));
    } else {
      await membershipService.changePassword(userId, password);
    }
    res.status(200).send();
  } catch (error) {
    return next(error);
  }
}

/**
 * GET : /api/v1/account/history
 * @param {*} req
 * @param {*} res
 */
export async function getRecentLogins(req, res) {
  const result = await membershipService.getRecentUserLogins(req.user.id);
  res.json(result);
}