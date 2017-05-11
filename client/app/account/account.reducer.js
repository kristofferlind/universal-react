import actions from '../../config/actions';
import cookieService from '../../components/cookie.service';

const {
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR
} = actions;

// needs to be a function so that cookieService.init has run before it during server rendering
const initialState = () => {
  const token = cookieService.read('token');
  return {
    token,
    loggedIn: !!token,
    user: {}
  };
};

const reducerActions = {
  [LOAD_USER]: state => ({ ...state, isFetching: true }),
  [LOAD_USER_SUCCESS]: (state, action) => ({ user: action.data, loggedIn: true, isFetching: false }),
  [LOAD_USER_ERROR]: (state, action) => ({ error: action.error, loggedIn: false, isFetching: false })
};

const accountReducer = (state = initialState(), action) => {
  if (!reducerActions[action.type]) {
    return state;
  }
  return reducerActions[action.type](state, action);
};

export default accountReducer;
