const JwtStrategy = require('passport-jwt').Strategy;

module.exports.authorize = (options, verify) => {
  const strategy = new JwtStrategy(options, verify);

  return function authorize(socket, accept) {
    strategy.success = function success(user) {
      socket.handshake.user = user;
      accept();
    };

    strategy.fail = (info) => accept(new Error(info));
 
    strategy.error = (error) => accept(error);

    strategy.authenticate(socket.request, {});
  };
};
