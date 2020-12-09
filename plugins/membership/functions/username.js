import { membershipService } from '../../../services';

class Username{
  function isUsernameExist(username){
      const user = membershipService.isUsernameExist(username);
      return user;
  }
}

export default Username;
