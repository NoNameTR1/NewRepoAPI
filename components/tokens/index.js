import _ from 'lodash';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
import config from '../../config/environment';
import { redisAuthHelper } from '../redis';

function prepareJwtToken(user) {
  const privateKey = fs.readFileSync(
    `${config.root}/keys/private_key.pem`,
    'utf8',
  );

  const signOptions = {
    issuer: 'EmreKasgurAuth v1.0',
    subject: user.email,
    audience: 'http://localhost:4000',
    expiresIn: 60 * 60 * 12,
    algorithm: 'RS256',
  };

  // We don't want to store the sensitive information such as the
  // user password in the token so we pick only the email and id
  const body = {
    id: user.id,
    name: user.name,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.verified,
    // authorization: {
    //   roles: _.map(user.roles, item => item.key),
    // },
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
  
  try{
    redisAuthHelper.storeRefreshToken(`${user.id}`, refreshToken);
  }catch(err){
    console.log(err);
  }
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