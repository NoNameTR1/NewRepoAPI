import express from 'express';
import * as MembershipController from './membership.controller';

const router = express.Router();

router.get('/:id', MembershipController.getUserById);

module.exports = router;
