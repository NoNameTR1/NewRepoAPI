import { membershipService } from '../../../services';
import AuthEmailAlreadyExistsError from '../../errors/models/AuthEmailAlreadyExistsError';
import AuthUsernameAlreadyExistsError from '../../errors/models/AuthUsernameAlreadyExistsError';

class MembershipLoginHandler {
  /**
   * @param req
   * @returns {Boolean<true/false>}
   */
  async login(req) {
    const { username, password } = req;
    const result = membershipService.login(username, password);

    return result;
  }
  async register(name, username, password, email) {
    // Check username existence
    if (await membershipService.isUsernameExist(username)) {
      throw new AuthUsernameAlreadyExistsError(username);
    }
    // Check email existence
    if (await membershipService.isEmailExists(email)) {
      throw new AuthEmailAlreadyExistsError(email);
    }

    // User Creation
    const user = await membershipService.addUser({
      name,
      username,
      email,
      password,
      email_verified: this.container.testing(),
      verified_at: this.container.testing() ? new Date() : null,
      created_at: new Date(),
    });

    /* if (!this.container.testing()) {
      // Email verification
      const verification = await membershipService.addVerificationCode(email, user.uid);
      let verificationEmail = new Signup(
        user.email,
        user.id,
        user.fullName,
        verification.code,
      );
      verificationEmail.send();
    }*/
    return user;
  }
}

export default MembershipLoginHandler;
