import { combineReducers } from 'redux';
import account from './account/account.reducer';
import app from './app.reducer';
import todo from './todo/todo.reducer';

export default combineReducers({
  account,
  app,
  todo
});
