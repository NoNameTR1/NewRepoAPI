import $Error from '../$Error';

class AuthPasswordResetTokenInvalidError extends $Error {
  constructor(token) {
    super();
    this.setPayload({ token });
  }

  onMessage() {
    const { token } = this.payload;
    return `The password reset with token="${token}" does not exist or has been expired.`;
  }
}

export default AuthPasswordResetTokenInvalidError;
