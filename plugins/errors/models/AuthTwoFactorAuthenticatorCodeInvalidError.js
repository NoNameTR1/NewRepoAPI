import $Error from '../$Error';

class AuthTwoFactorAuthenticatorCodeInvalidError extends $Error {
  constructor(userId, code) {
    super();
    this.setPayload({ userId,code });
  }

  onMessage() {
    const { userId, code } = this.payload;
    return `The tfa code=${code} is invalid for user="${userId}".`;
  }
}

export default AuthTwoFactorAuthenticatorCodeInvalidError;
