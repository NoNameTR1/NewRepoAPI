import $Error from '../$Error';

class AuthEmailVerificationCodeNotFoundError extends $Error {
  constructor(code) {
    super();
    this.setPayload({ code });
  }

  onMessage() {
    const { code } = this.payload;
    return `The verification code=${code} could not be found.`;
  }
}

export default AuthEmailVerificationCodeNotFoundError;
