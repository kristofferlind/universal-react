const onConnect = (socket) => {
  console.log('connect', socket); // eslint-disable-line no-console
};
const onDisconnect = (socket) => {
  console.log('disconnect', socket); // eslint-disable-line no-console
};

// TODO: implement socketio jwt auth, socketio-jwt
const setup = (socketio) => {
  socketio.on('connection', (socket) => {
    socket.on('disconnect', () => {
      onDisconnect(socket);
    });
    onConnect(socket);
  });
};

export default {
  setup
};
