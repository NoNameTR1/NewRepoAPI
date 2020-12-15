import { unauthenticated, checkUserRole } from './index';

module.exports = function(req, res, next) {
  if (!req.user) return unauthenticated(res);
  checkUserRole(req.user, res, next);
};