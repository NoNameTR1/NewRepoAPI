import passport from 'passport';

import $ServiceHandler  from '../../$ServiceHandler';

class PassportHandler extends $ServiceHandler {
  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<unknown>}
   */
  authenticate(req, res, next) {
    return new Promise(((resolve, reject) => {
      passport.authenticate('login', {}, (err, user) => {
        if (err) {
          return reject(err);
        }
        return resolve(user);
      })(req, res, next);
    }));
  }

  /**
   *
   * @param req
   * @param user
   * @returns {Promise<unknown>}
   */
  login(req, user) {
    return new Promise(((resolve, reject) => {
      req.login(user, { session: false }, async error => {
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    }));
  }
}

export default PassportHandler;
