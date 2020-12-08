import redisAdapter from 'socket.io-redis';
import fs from 'fs';
import { ExtractJwt } from 'passport-jwt';
import { redisSocketsHelper } from '~components/redis';
import { membershipService } from '~services';
import passportJwtSocketIo from '../helpers/socket/jwt';
import config from './environment';

// // When the user disconnects.. perform this
// async function onDisconnect(socket) {
//   const uid = socket.decoded_token.user.uid;

//   redisSocketsHelper.removeSocket(uid);
//   socket.log(`Removing from Redis, socket id #${socket.id} for user ${uid}.`);

//   await membershipService.setUserOffline(uid);
// }

// // When the user connects.. perform this
// async function onConnect(socket) {
//   const uid = socket.decoded_token.user.uid;

//   // Insert sockets below
//   redisSocketsHelper.storeConnectedSocket(uid, socket.id);
//   socket.log(`Storing in Redis, socket id #${socket.id} for user ${uid}.`);

//   // Set user presence to online
//   await membershipService.setUserOnline(uid);

//   socket.on('info', data => {
//     socket.log(JSON.stringify(data, null, 2));
//   });
// }

export default function(socketio, app) {
  app.use(function(req, res, next) {
    req.io = socketio;
    next(); 
  });

  // Set socket.io adapter to Redis
  socketio.adapter(redisAdapter(process.env.REDIS_URL));

  const publicKey = fs.readFileSync(
    `${config.root}/keys/public-local.pem`,
    'utf8',
  );

  console.log('WS Initializing SocketIO.');

  const options = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: publicKey,
  };

  function verify(jwtPayload, done) {
    done(null, jwtPayload.user);
  }

  socketio.use(passportJwtSocketIo.authorize(options, verify));

  socketio.on('connection', function(socket) {
    socket.address = `${socket.request.connection.remoteAddress || socket.handshake.headers['x-real-ip']}:${socket.handshake.headers['x-real-port'] || socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.join(`u-${socket.handshake.user.id}`);

    socket.log = function(...data) {
      // eslint-disable-next-line no-console
      console.log(`WS ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      // onDisconnect(socket);
      socket.log('Client disconnected.');
    });

    // Call onConnect.
    // onConnect(socket);
    socket.log('Client connected.');
  });
}