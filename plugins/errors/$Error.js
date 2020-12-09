import { getErrorCode, getStatusCode } from './utils/utils';

/**
 * Base Error
 */
class $Error extends Error {

  /**
   * @type {String}
   */
  errorCode;

  /**
   * @type {Number}
   */
  statusCode;

  /**
   * @type {Object|null}
   */
  payload;

  /**
   * @type {String}
   */
  name;

  /**
   * @type {Error|null}
   */
  nativeError;

  constructor() {
    super();
    this.name = this.constructor.name;
    this.errorCode = getErrorCode(this.constructor.name);
    this.statusCode = getStatusCode(this.constructor.name);
    this.expected = true;
    this.payload = null;
    this.nativeError = null;

    Error.captureStackTrace(this, this.constructor);
  }

  /**
   *
   * @param {Error} error
   */
  setNativeError(error) {
    this.nativeError = error;
  }

  /**
   *
   * @returns {Error|null}
   */
  getNativeError() {
    return this.nativeError;
  }

  /**
   *
   * @returns {String}
   */
  getCode() {
    return this.errorCode;
  }

  /**
   *
   * @returns {Number}
   */
  getStatus() {
    return this.statusCode;
  }

  /**
   *
   * @param {Object} payload
   */
  setPayload(payload) {
    this.payload = payload;
    this.setMessage(this.onMessage());
  }

  /**
   *
   * @returns {Object|null}
   */
  getPayload() {
    return this.payload;
  }

  /**
   *
   * @param {Boolean} isExpected
   */
  setExpected(isExpected) {
    this.expected = isExpected;
  }

  /**
   *
   * @returns {Boolean}
   */
  isExpected() {
    return this.expected;
  }

  /**
   *
   * @param {String} message
   */
  setMessage(message) {
    this.message = message;
  }

  /**
   *
   * @returns {String}
   */
  getMessage() {
    return this.message ? this.message : '';
  }

  /**
   * Returns the generated message of error
   * @abstract
   * @return {String}
   */
  onMessage() {
    return 'This error has been threw intentionally.';
  }
}

export default $Error;