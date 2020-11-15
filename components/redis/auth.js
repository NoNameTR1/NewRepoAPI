import { redisClient } from './';
const REFRESH_TOKEN_HASH_KEY = 'refresh_tokens';

async function storeRefreshToken(uid, refreshToken) {
  const result = await redisClient.hset(
    REFRESH_TOKEN_HASH_KEY,
    refreshToken,
    uid
  );
  return result;
}

async function validateRefreshToken(refreshToken) {
  const result = await redisClient.hget(REFRESH_TOKEN_HASH_KEY, refreshToken);
  return result;
}

async function invalidateRefreshToken(uid) {
  const result = await redisClient.hdel(REFRESH_TOKEN_HASH_KEY, uid);
  return result;
}

module.exports = {
  storeRefreshToken,
  validateRefreshToken,
  invalidateRefreshToken,
};
