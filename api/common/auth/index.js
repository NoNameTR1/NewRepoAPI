import express from 'express';
import * as AuthController from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refreshToken);

module.exports = router;
