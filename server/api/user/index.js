import express from 'express';
import { index, me } from './user.controller';

const router = express.Router();

export default router;

router.get('/', index);
router.get('/me', me);
