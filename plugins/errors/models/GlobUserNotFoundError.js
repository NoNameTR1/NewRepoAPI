import $Error from '../$Error';

class GlobUserNotFoundError extends $Error {
  constructor(userId = null, email = null) {
    super();
    this.setPayload({ userId, email });
  }

  onMessage() {
    const { userId, email } = this.payload;
    if (userId) {
      return `The user with id="${userId}" could not be found.`;
    } else {
      return `The user with email="${email}" could not be found.`;
    }
  }
}

export default GlobUserNotFoundError;
