import $Error from '../$Error';

class AuthUsernameAlreadyExistsError extends $Error {
  constructor(username) {
    super();
    this.setPayload({ username });
  }

  onMessage() {
    const { username } = this.payload;
    return `The username="${username}" already exists.`;
  }
}

export default AuthUsernameAlreadyExistsError;
