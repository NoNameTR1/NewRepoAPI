import $Error from '../$Error';

class AuthRefreshTokenInvalidError extends $Error {
  constructor(token) {
    super();
    this.setPayload({ token });
  }

  onMessage() {
    const { token } = this.payload;
    return `The refresh token="${token}" does not exist or has been expired.`;
  }
}

export default AuthRefreshTokenInvalidError;
