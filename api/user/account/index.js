import express from 'express';
import * as UserAccountController from './account.controller';

const router = express.Router();

router.get('/me', UserAccountController.getCurrentUser);

// router.put('/me', /* validate(accountSchema.updateUserSchema),*/ UserAccountController.updateCurrentUser);

// router.put('/password', validate(accountSchema.changePasswordSchema), UserAccountController.changePassword);

// router.get('/history', UserAccountController.getRecentLogins);

module.exports = router;