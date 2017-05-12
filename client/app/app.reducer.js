import actions from '../config/actions';

const {
  CONNECT,
  DISCONNECT
} = actions;

// needs to be a function so that cookieService.init has run before it during server rendering
const initialState = () => ({
  isOnline: true
});

const reducerActions = {
  [CONNECT]: state => ({ ...state, isOnline: true }),
  [DISCONNECT]: state => ({ ...state, isOnline: false })
};

const appReducer = (state = initialState(), action) => {
  if (!reducerActions[action.type]) {
    return state;
  }
  return reducerActions[action.type](state, action);
};

export default appReducer;
