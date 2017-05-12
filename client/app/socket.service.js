import socketIO from 'socket.io-client';
import { apiEndpoints } from '../config';
import todoActions from './todo/todo.actions';
import appActions from './app.actions';

export default (store) => {
  const socket = socketIO.connect(apiEndpoints.SOCKET);

  const emit = (message) => {
    socket.emit('somethingsomething', message);
  };

  const skipMine = (from, func) => {
    const me = 'id';
    if (from !== me) {
      func();
    }
  };

  const connectAction = () => appActions.connect()(store.dispatch);
  const disconnectAction = () => appActions.disconnect()(store.dispatch);

  socket
    .on('connect', connectAction)
    .on('disconnect', disconnectAction)
    .on('connect_error', disconnectAction)
    .on('connect_timeout', disconnectAction)
    .on('error', disconnectAction)
    .on('reconnect', disconnectAction)
    .on('reconnect_attempt', disconnectAction)
    .on('reconnecting', disconnectAction)
    .on('reconnect_error', disconnectAction)
    .on('todo:save', ({ from, data }) => skipMine(from, () => todoActions.saved(data)(store.dispatch)))
    .on('todo:remove', ({ from, data }) => skipMine(from, () => todoActions.removed(data)(store.dispatch)));

  return {
    emit
  };
};
