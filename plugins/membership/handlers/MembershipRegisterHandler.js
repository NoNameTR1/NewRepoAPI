// import { membershipService } from '../../../services';
// // import { Signup } from '../../../components/notification/mail/membership';
// import AuthReferenceCodeNotFoundError from '../../errors/models/AuthReferenceCodeNotFoundError';
// import AuthUsernameAlreadyExistsError from '../../errors/models/AuthUsernameAlreadyExistsError';
// import AuthEmailAlreadyExistsError from '../../errors/models/AuthEmailAlreadyExistsError';

// import $ServiceHandler from '../../$ServiceHandler';
// // import { NotificationTypes } from '../../constants';

// class MembershipRegisterHandler extends $ServiceHandler {

//   /**
//    * NOTE:
//    * We can get ip address via (req.headers['x-real-ip'] || req.connection.remoteAddress)
//    *
//    * @param fullName
//    * @param username
//    * @param password
//    * @param email
//    * @param referenceCode
//    * @param isTrader
//    * @returns {Promise<{}>}
//    */
//   async register(fullName, username, password, email, referenceCode, isTrader = false) {

//     const {
//       membershipService: { userStorage, referenceHandler },
//       notificationService: { notificationHandler },
//     } = this.container;

//     // Check reference code existence
//     let referrerUser = null;
//     if (referenceCode) {
//       referrerUser = await userStorage.getUserByReferenceCode(referenceCode);
//       if (!referrerUser) {
//         throw new AuthReferenceCodeNotFoundError(referenceCode);
//       }
//     }

//     // Check username existence
//     if (await membershipService.isUsernameExist(username)) {
//       throw new AuthUsernameAlreadyExistsError(username);
//     }

//     // Check email existence
//     if (await membershipService.isEmailExists(email)) {
//       throw new AuthEmailAlreadyExistsError(email);
//     }

//     const roleId = isTrader ? 2 : 3;

//     // User Creation
//     const user = await membershipService.addUser({
//       fullName,
//       username,
//       email,
//       password,
//       referenceCode: await referenceHandler.generateReferenceCode(),
//       referrerUserId: referrerUser ? referrerUser.id : null,
//       isActive: true,
//       email_verified: this.container.testing(),
//       verified_at: this.container.testing() ? new Date() : null,
//     }, roleId);

//     if (!this.container.testing()) {
//       // Email verification
//       const verification = await membershipService.addVerificationCode(email, user.uid);
//       let verificationEmail = new Signup(
//         user.email,
//         user.id,
//         user.fullName,
//         roleId,
//         verification.code,
//       );
//       verificationEmail.send();
//     }

//     // Reference Code
//     if (referrerUser) {
//       await notificationHandler.notify(referrerUser.id, NotificationTypes.REFERENCE_USED, {
//         user: {
//           id: user.id,
//           fullName: user.fullName,
//           pictureThumbPath: user.pictureThumbPath,
//           roleId: roleId,
//         },
//       });
//     }

//     return user;
//   }
// }

// export default MembershipRegisterHandler;

