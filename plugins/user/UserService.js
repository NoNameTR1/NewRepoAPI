import $Service from '../$Service';

import userHandler from './handlers/userHandler';

/**
 * Membership Service
 * @property {MembershipLoginHandler} loginHandler
*/

class UserService extends $Service {
  /**
   * @type {MembershipLoginHandler}
   */
  userHandler = new userHandler();
}

export default UserService;
