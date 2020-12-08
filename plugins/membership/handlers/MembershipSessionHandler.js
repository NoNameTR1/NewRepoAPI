import { redisAuthHelper } from '../../../components/redis';
import { membershipService } from '../../../services';
import tokens from '../../../components/tokens';
import AuthRefreshTokenInvalidError from '../../errors/models/AuthRefreshTokenInvalidError';
import GlobUserNotFoundError from '../../errors/models/GlobUserNotFoundError';

import $ServiceHandler  from '../../$ServiceHandler';

class MembershipSessionHandler extends $ServiceHandler {
  async check() {

  }

  async refresh(token) {
    const userId = await redisAuthHelper.validateRefreshToken(token);

    if (!userId) {
      throw new AuthRefreshTokenInvalidError();
    }

    const user = await membershipService.getUserByUid(userId);

    if (!user) {
      throw new GlobUserNotFoundError(userId);
    }

    const accessToken = tokens.prepareJwtToken(user);
    const refreshToken = tokens.prepareRefreshToken(user);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}

export default MembershipSessionHandler;
