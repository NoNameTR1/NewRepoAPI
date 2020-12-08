import $Error from '../$Error';

class GlobCriticalError extends $Error {
  constructor(nativeError) {
    super();
    this.setNativeError(nativeError);
    this.setExpected(false);
  }

  onMessage() {
    return `This message has been threw unexpectedly.`;
  }
}

export default GlobCriticalError;
