import $Error from '../$Error';

class AuthIncompleteUserError extends $Error {
  constructor(userId) {
    super();
    this.setPayload({ userId });
  }

  onMessage() {
    const { userId } = this.payload;
    return `The user with id="${userId}" is incomplete.`;
  }
}

export default AuthIncompleteUserError;
