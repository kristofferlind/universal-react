import express from 'express';
import user from './user';
import { isAuthenticated } from '../auth';
import todo from './todo';

export default (io) => {
  const router = express.Router();

  router.use('/user', isAuthenticated, user);
  router.use('/todo', isAuthenticated, todo(io));

  return router;
};
