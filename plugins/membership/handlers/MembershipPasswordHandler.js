import { membershipService } from '../../../services';
import { ResetPassword } from '../../../components/notification/mail/membership';
import GlobUserNotFoundError from '../../errors/models/GlobUserNotFoundError';
import AuthPasswordResetTokenInvalidError from '../../errors/models/AuthPasswordResetTokenInvalidError';

import $ServiceHandler  from '../../$ServiceHandler';

class MembershipPasswordHandler extends $ServiceHandler {

  /**
   *
   * @param email
   * @returns {Promise<void>}
   */
  async requestPasswordReset(email) {

    const user = await membershipService.createPasswordResetRequest(
      email,
    );

    if (!user) {
      throw new GlobUserNotFoundError(null, email);
    }

    let verificationEmail = new ResetPassword(
      user.email,
      user.id,
      user.fullName,
      '',
      '',
      user.resetToken,
    );
    verificationEmail.send();
  }

  /**
   *
   * @param token
   * @returns {Promise<boolean>}
   */
  async verifyPasswordResetToken(token) {
    const result = await membershipService.validatePasswordResetRequest(token);

    if (!result) {
      throw new AuthPasswordResetTokenInvalidError(token);
    }

    return true;
  }

  /**
   *
   * @param token
   * @param password
   * @returns {Promise<boolean>}
   */
  async resetPassword(token, password) {
    const result = await membershipService.changePasswordWithToken(token, password);

    if (!result) {
      throw new AuthPasswordResetTokenInvalidError(token);
    }

    return true;
  }
}

export default MembershipPasswordHandler;
