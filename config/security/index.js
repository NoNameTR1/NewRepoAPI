// import _ from 'lodash';
// import config from '../environment';

export const unauthenticated = (res) => {
  return res.status(401).json({ status: 401, message: 'Invalid role.' });
};

export const checkUserRole = (user, res, next) => {
  console.log(user);
  return next();
};

// export const checkOwnerRole = (user, res, next) => {
//   if (!user.authorization || !user.authorization.roles)
//     return unauthenticated(res);

//   if (
//     _.includes(user.authorization.roles, config.userRoles.superadmin) ||
//     _.includes(user.authorization.roles, config.userRoles.trader)
//   ) {
//     return next();
//   } else {
//     return unauthenticated(res);
//   }
// };

// export const checkSuperadminRole = (user, res, next) => {
//   if (!user.authorization || !user.authorization.roles)
//     return unauthenticated(res);

//   if (_.includes(user.authorization.roles, config.userRoles.superadmin)) {
//     return next();
//   } else {
//     return unauthenticated(res);
//   }
// };

// export { default as roleSuperadminMiddleware } from './sa';
export { default as roleUserMiddleware } from './user';
