import socketIO from 'socket.io-client';
import { apiEndpoints } from '../config';
import todoActions from './todo/todo.actions';

export default (store) => {
  const socket = socketIO.connect(apiEndpoints.SOCKET);

  const emit = (message) => {
    socket.emit('somethingsomething', message);
  };

  socket.on('connect_failed', (reason) => {
    console.error(reason);  // eslint-disable-line no-console
  });

  const skipMine = (from, func) => {
    const me = 'id';
    if (from !== me) {
      func();
    }
  };

  socket.on('todo:save', ({ from, data }) => skipMine(from, () => todoActions.saved(data)(store.dispatch)));
  socket.on('todo:remove', ({ from, data }) => skipMine(from, () => todoActions.removed(data)(store.dispatch)));

  return {
    emit
  };
};
