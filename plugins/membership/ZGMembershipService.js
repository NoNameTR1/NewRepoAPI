import $Service from '../$Service';

import MembershipLoginHandler from './handlers/MembershipLoginHandler';
import MembershipRegisterHandler from './handlers/MembershipRegisterHandler';
/**
 * Membership Service
 * @property {MembershipLoginHandler} loginHandler
 */

class ZGMembershipService extends $Service {
  /**
   * @type {MembershipLoginHandler}
   */
  loginHandler = new MembershipLoginHandler();
  registerHandler  = new MembershipRegisterHandler();
}

export default ZGMembershipService;
