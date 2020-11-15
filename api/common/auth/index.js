import express from 'express';
import * as AuthController from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);

module.exports = router;
