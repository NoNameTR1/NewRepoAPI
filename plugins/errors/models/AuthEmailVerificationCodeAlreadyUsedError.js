import $Error from '../$Error';

class AuthEmailVerificationCodeAlreadyUsedError extends $Error {
  constructor(code) {
    super();
    this.setPayload({ code });
  }

  onMessage() {
    const { code } = this.payload;
    return `The verification code=${code} already used.`;
  }
}

export default AuthEmailVerificationCodeAlreadyUsedError;
