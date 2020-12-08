import { membershipService } from '~services';
import AuthEmailVerificationCodeNotFoundError from '../../errors/models/AuthEmailVerificationCodeNotFoundError';
import AuthEmailVerificationCodeAlreadyUsedError from '../../errors/models/AuthEmailVerificationCodeAlreadyUsedError';
import AuthEmailVerificationCodeExpiredError from '../../errors/models/AuthEmailVerificationCodeExpriedError';

import $ServiceHandler from '../../$ServiceHandler';

class MembershipEmailVerificationHandler extends $ServiceHandler {
  /**
   *
   * @param code
   * @returns {Promise<boolean>}
   * @throws {AuthEmailVerificationCodeNotFoundError}
   * @throws {AuthEmailVerificationCodeAlreadyUsedError}
   * @throws {AuthEmailVerificationCodeExpiredError}
   */
  async verify(code) {
    const emailVerification = await membershipService.getEmailVerification(
      code
    );
    if (!emailVerification) {
      throw new AuthEmailVerificationCodeNotFoundError(code);
    }

    if (!emailVerification.isActive) {
      throw new AuthEmailVerificationCodeAlreadyUsedError(code);
    }

    const isExpired = await membershipService.isEmailVerificationCodeExpired(
      code
    );
    if (isExpired) {
      throw new AuthEmailVerificationCodeExpiredError(code);
    }

    await membershipService.inActivateVerificationCode(code);
    await membershipService.verifyEmail(emailVerification.email);

    return true;
  }

  // async resend(email) {
  //todo:
  // }
}

export default MembershipEmailVerificationHandler;
