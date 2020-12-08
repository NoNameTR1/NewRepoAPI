import $Error from '../$Error';

class AuthInvalidCredentialsError extends $Error {

  constructor(email, password) {
    super();
    this.setPayload({ email, password });
  }


  onMessage() {
    const { email, password } = this.payload;
    if (password) {
      return `The user with email="${email}",password="${password}" could not be found.`;
    } else {
      return `The user with email="${email}" could not be found.`;
    }
  }
}

export default AuthInvalidCredentialsError;
