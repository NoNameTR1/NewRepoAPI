import $Error from '../$Error';

class AuthTwoFactorAuthenticatorCodeRequiredError extends $Error {
  constructor(userId) {
    super();
    this.setPayload({ userId });
  }

  onMessage() {
    const { userId } = this.payload;
    return `The user="${userId}" has been enabled tfa and code is required.`;
  }
}

export default AuthTwoFactorAuthenticatorCodeRequiredError;
