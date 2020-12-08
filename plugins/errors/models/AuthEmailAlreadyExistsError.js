import $Error from '../$Error';

class AuthEmailAlreadyExistsError extends $Error {
  constructor(email) {
    super();
    this.setPayload({ email });
  }

  onMessage() {
    const { email } = this.payload;
    return `The email="${email}" already exists.`;
  }
}

export default AuthEmailAlreadyExistsError;
