import $Error from '../$Error';

class AuthEmailNotVerifiedError extends $Error {
  constructor(userId) {
    super();
    this.setPayload({ userId });
  }


  onMessage() {
    const { userId } = this.payload;
    return `The user with id=${userId} has not verified email address yet.`;
  }
}

export default AuthEmailNotVerifiedError;
