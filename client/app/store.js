import { createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import transactionMiddleware from '../components/transaction.middleware';

let applyMiddleware;
if (process.env.BROWSER) {
  applyMiddleware = require('redux').applyMiddleware; // eslint-disable-line
} else {
  applyMiddleware = require('redux-universal'); // eslint-disable-line
}

const composeEnhancer = (process.env.BROWSER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line no-underscore-dangle, max-len

export default (initialState, history, rootReducer) => {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];

  const store = createStore(
    connectRouter(history)(transactionMiddleware(rootReducer)),
    initialState,
    composeEnhancer(
      applyMiddleware(...middlewares)
    )
  );

  return store;
};
