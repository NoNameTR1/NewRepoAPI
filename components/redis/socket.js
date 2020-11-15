import { redisClient } from './';
const SOCKETS_HASH_KEY = 'sockets';

async function storeConnectedSocket(uid, socketId) {
  const result = await redisClient.hset(SOCKETS_HASH_KEY, uid, socketId);
  return result;
}

async function getSocket(uid) {
  const result = await redisClient.hget(SOCKETS_HASH_KEY, uid);
  return result;
}

async function removeSocket(uid) {
  const result = await redisClient.hdel(SOCKETS_HASH_KEY, uid);
  return result;
}

module.exports = {
  storeConnectedSocket,
  getSocket,
  removeSocket,
};
