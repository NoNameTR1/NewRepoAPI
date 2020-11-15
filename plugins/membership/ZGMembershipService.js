import $Service from '../$Service';

import MembershipLoginHandler from './handlers/MembershipLoginHandler';

/**
 * Membership Service
 * @property {MembershipLoginHandler} loginHandler
 */

class ZGMembershipService extends $Service {
  /**
   * @type {MembershipLoginHandler}
   */
  loginHandler = new MembershipLoginHandler();
}

export default ZGMembershipService;
