import _ from 'lodash';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
import config from '~config/environment';
import { redisAuthHelper } from '../redis';

function prepareJwtToken(user) {
  const privateKey = fs.readFileSync(
    `${config.root}/keys/private-local.pem`,
    'utf8',
  );

  const signOptions = {
    issuer: 'AlienBrokerAuth v1.0',
    subject: user.email,
    audience: 'https://app.alienbroker.com',
    expiresIn: 60 * 60 * 12,
    algorithm: 'RS256',
  };

  // We don't want to store the sensitive information such as the
  // user password in the token so we pick only the email and id
  const body = {
    id: user.id,
    uid: user.uid,
    fullName: user.fullName,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    avatar: user.avatar,
    authorization: {
      roles: _.map(user.roles, item => item.key),
    },
    // corporation: {
    //   id: user.corporation.id,
    //   name: user.corporation.name,
    //   logo: user.corporation.logo,
    // },
  };

  const payload = {
    user: body,
  };

  //Sign the JWT token and populate the payload with the user email and id
  const accessToken = jwt.sign(payload, privateKey, signOptions);
  return accessToken;
}

function prepareRefreshToken(user) {
  const refreshToken = randToken.uid(256);
  redisAuthHelper.storeRefreshToken(user.uid, refreshToken);

  return refreshToken;
}

function prepareRandomToken(length) {
  const token = randToken.uid(length);
  return token;
}

function prepareRandomReceiptNumber(length) {
  const tokenGenerator = randToken.generator({ chars: '0-9' });
  return `M-${tokenGenerator.generate(length)}`;
}

module.exports = {
  prepareJwtToken,
  prepareRefreshToken,
  prepareRandomToken,
  prepareRandomReceiptNumber,
};