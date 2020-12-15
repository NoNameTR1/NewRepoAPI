import { membershipService } from '../../../services';
import AuthEmailAlreadyExistsError from '../../errors/models/AuthEmailAlreadyExistsError';
import AuthUsernameAlreadyExistsError from '../../errors/models/AuthUsernameAlreadyExistsError';
import GlobUserNotFoundError from '../../errors/models/GlobUserNotFoundError';
import AuthInvalidCredentialsError from '../../errors/models/AuthInvalidCredentialsError';

import tokens from '../../../components/tokens';

import bcrypt from 'bcrypt';

class MembershipLoginHandler {
  /**
   * @param req
   * @returns {Boolean<true/false>}
   */
  async login(req) {
    const { username, password } = req;
    const user = await membershipService.getUserByUsername(username, '*');
    const data = {};
    if (user) {
      const compared = await bcrypt.compareSync(password, user.password);

      if (compared === true) {
        delete user.password;

        data['currentUser'] = user;
        data['isAuthenticated'] = true;

        const accessToken = tokens.prepareJwtToken(data.currentUser);
        data['accessToken'] = accessToken;

        const refreshToken = tokens.prepareRefreshToken(data.currentUser);
        data['refreshToken'] = refreshToken;

        return data;
      } else {
        throw new AuthInvalidCredentialsError({ email: username, password });
      }
    } else {
      throw new GlobUserNotFoundError(username);
    }

    // const result = membershipService.login(username, hashPassword);

    // return result;
  }
}

export default MembershipLoginHandler;
