import actions from '../config/actions';

const {
  CONNECT,
  DISCONNECT
} = actions;

const createConnectEvent = () => {
  const event = new CustomEvent('app:connect');
  document.dispatchEvent(event);
};

export default {
  connect: () => (dispatch) => {
    createConnectEvent();
    dispatch({ type: CONNECT });
  },
  disconnect: () => dispatch => dispatch({ type: DISCONNECT })
};
