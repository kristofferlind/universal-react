import { createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import transactionMiddleware from '../components/transaction.middleware';
import stateReconciler from './state-reconciler.redux-persist';

let applyMiddleware;
if (process.env.BROWSER) {
  applyMiddleware = require('redux').applyMiddleware; // eslint-disable-line
} else {
  applyMiddleware = require('redux-universal'); // eslint-disable-line
}

const composeEnhancer = (process.env.BROWSER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;  // eslint-disable-line no-underscore-dangle, max-len

export default (initialState, history, rootReducer) => {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];

  if (process.env.BROWSER) {
    const store = createStore(
      connectRouter(history)(transactionMiddleware(rootReducer)),
      initialState,
      composeEnhancer(
        applyMiddleware(...middlewares),
        autoRehydrate({ stateReconciler })
      )
    );
    persistStore(store, { storage: localForage, whitelist: ['account', 'todo', 'transactions'] });

    return store;
  }
  const store = createStore(
    connectRouter(history)(transactionMiddleware(rootReducer)),
    initialState,
    composeEnhancer(
      applyMiddleware(...middlewares)
    )
  );
  return store;
};
