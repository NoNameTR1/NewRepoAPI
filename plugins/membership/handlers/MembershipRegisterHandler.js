import { membershipService } from '../../../services';
// import { Signup } from '../../../components/notification/mail/membership';

import AuthUsernameAlreadyExistsError from '../../errors/models/AuthUsernameAlreadyExistsError';
import AuthEmailAlreadyExistsError from '../../errors/models/AuthEmailAlreadyExistsError';
import bcrypt from 'bcrypt';
import $ServiceHandler from '../../$ServiceHandler';
// import { NotificationTypes } from '../../constants';

class MembershipRegisterHandler extends $ServiceHandler {
  /**
   * NOTE:
   * We can get ip address via (req.headers['x-real-ip'] || req.connection.remoteAddress)
   *
   * @param fullName
   * @param username
   * @param password
   * @param email
   * @param referenceCode
   * @param isTrader
   * @returns {Promise<{}>}
   */
  async register(body) {

    const { name, username, password, email } = body;
    
    // Check username existence
    if (await membershipService.isUsernameExist(username)) {
      throw new AuthUsernameAlreadyExistsError(username);
    }
    // Check email existence
    if (await membershipService.isEmailExists(email)) {
      throw new AuthEmailAlreadyExistsError(email);
    }
    // User Creation
    const hashPassword = await bcrypt.hashSync(password, 10);
    console.log(hashPassword);
    const user = await membershipService.addUser({
      name,
      username,
      email,
      password: hashPassword,
      token: 'itstoken',
      verified: true,
    });

    // if (!this.container.testing()) {
    //   // Email verification
    //   const verification = await membershipService.addVerificationCode(
    //     email,
    //     user.uid
    //   );
    //   let verificationEmail = new Signup(
    //     user.email,
    //     user.id,
    //     user.fullName,
    //     roleId,
    //     verification.code
    //   );
    //   verificationEmail.send();

    // Reference Code
    // if (referrerUser) {
    //   await notificationHandler.notify(
    //     referrerUser.id,
    //     NotificationTypes.REFERENCE_USED,
    //     {
    //       user: {
    //         id: user.id,
    //         fullName: user.fullName,
    //         pictureThumbPath: user.pictureThumbPath,
    //         roleId: roleId,
    //       },
    //     }
    //   );
    // }
    return user;
  }
}

export default MembershipRegisterHandler;
