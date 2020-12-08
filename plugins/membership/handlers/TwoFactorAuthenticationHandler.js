import $ServiceHandler from '../../$ServiceHandler';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import AuthTwoFactorAuthenticatorCodeRequiredError from '../../errors/models/AuthTwoFactorAuthenticatorCodeRequiredError';
import AuthTwoFactorAuthenticatorCodeInvalidError from '../../errors/models/AuthTwoFactorAuthenticatorCodeInvalidError';

class TwoFactorAuthenticationHandler extends $ServiceHandler {

  /**
   *
   * @param userId
   * @returns {Promise<{qr: void, secret: String}>}
   */
  async enableTFA(userId) {
    const {
      membershipService: { userStorage },
    } = this.container;

    let user = await userStorage.getUser(userId);

    const secret = speakeasy.generateSecret({
      length: 10,
      name: user.uid,
      issuer: 'AlienBrokerAuth v1.0',
    });

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: user.uid,
      issuer: 'AlienBrokerAuth v1.0',
      encoding: 'base32',
    });

    let dataURL = await this._generateQRCode(url);

    await this.redis._hset('tfa:authenticator', `${user.id}:secret`, secret.base32);
    await this.redis._hset('tfa:authenticator', `${user.id}:qr`, dataURL);

    console.log('secret', secret.base32);
    console.log('dataURL', dataURL);
    console.log('url', url);
    console.log('output_url', secret.otpauth_url);

    return {
      secret: secret.base32,
      qr: dataURL,
    };
  }

  /**
   *
   * @param url
   * @returns {Promise<void>}
   * @private
   */
  async _generateQRCode(url) {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(url, async (error, dataURL) => {
        if (error) {
          return reject(error);
        }

        return resolve(dataURL);
      });
    });
  }

  /**
   *
   * @param userId
   * @param code
   * @returns {Promise<any>}
   */
  async verifyTFA(userId, code) {
    console.log(`DEBUG: Received TFA Verify request`);

    const {
      membershipService: { userStorage },
    } = this.container;

    let user = await userStorage.getUser(userId);

    let tempSecret = await this.redis._hget('tfa:authenticator', `${user.id}:secret`);

    let isVerified = speakeasy.totp.verify({
      secret: tempSecret,
      encoding: 'base32',
      token: code,
    });

    if (isVerified) {
      console.log(`DEBUG: TFA is verified to be enabled`);

      user = userStorage.updateUser(user.id, {
        tfaAuthenticatorSecret: tempSecret,
      });

      await this.redis._hdel('tfa:authenticator', `${user.id}:secret`);
      await this.redis._hdel('tfa:authenticator', `${user.id}:qr`);

      return true;
    }

    console.log(`ERROR: TFA is verified to be wrong`);

    return false;
  }

  /**
   *
   * @param userId
   * @param code
   * @returns {Promise<boolean>}
   */
  async checkTFA(userId, code) {
    const {
      membershipService: { userStorage },
    } = this.container;

    let user = await userStorage.getUser(userId);

    if (user.tfaAuthenticatorSecret) {

      if (!code) {
        throw new AuthTwoFactorAuthenticatorCodeRequiredError(user.id);
      }

      let isVerified = speakeasy.totp.verify({
        secret: user.tfaAuthenticatorSecret,
        encoding: 'base32',
        token: code,
      });

      if (!isVerified) {
        throw new AuthTwoFactorAuthenticatorCodeInvalidError(user.id, code);
      }
    }

    return true;
  }
}

export default TwoFactorAuthenticationHandler;
