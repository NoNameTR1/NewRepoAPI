import { membershipService } from '~services';

class MembershipLoginHandler {
  /**
   * @param req
   * @returns {Boolean<true/false>}
   */
  async getCurrenUse(req) {
    const { username, password } = req;
    const result = membershipService.login(username, password);
    return result;
  }
}

export default MembershipLoginHandler;
