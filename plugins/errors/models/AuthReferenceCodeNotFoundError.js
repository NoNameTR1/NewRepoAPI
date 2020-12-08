import $Error from '../$Error';

class AuthReferenceCodeNotFoundError extends $Error {
  constructor(referenceCode) {
    super();
    this.setPayload({ referenceCode });
  }

  onMessage() {
    const { referenceCode } = this.payload;
    return `The reference code="${referenceCode}" could not be found.`;
  }
}

export default AuthReferenceCodeNotFoundError;
