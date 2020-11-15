import asyncRedis from 'async-redis';

const REDIS_URL = process.env.REDIS_URL;
const client = asyncRedis.createClient(REDIS_URL);

client.on('error', function (err) {
  console.log(`[Redis] Error ${err}`);
});

export default client;
