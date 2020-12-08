import $Error from '../$Error';

class AuthEmailVerificationCodeExpiredError extends $Error {
  constructor(code) {
    super();
    this.setPayload({ code });
  }

  onMessage() {
    const { code } = this.payload;
    return `The verification code=${code} has been expired.`;
  }
}

export default AuthEmailVerificationCodeExpiredError;
