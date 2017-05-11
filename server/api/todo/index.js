import express from 'express';
import { index, create, update, destroy } from './todo.controller';

export default (io) => {
  const router = express.Router();

  router.get('/', index);
  router.post('/', create(io));
  router.put('/:id', update(io));
  router.delete('/:id', destroy(io));

  return router;
};
