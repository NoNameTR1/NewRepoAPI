import { membershipService } from '../../../services';

class userHandler {
  /**
   * @param req
   * @returns {Boolean<true/false>}
   */
  async getUserById(id) {
    const result = await membershipService.getUserById(id);
    return result;
  }
}

export default userHandler;
