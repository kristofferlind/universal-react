import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './configure-store';
import rootReducer from './root.reducer';

let browserHistory = null;
if (process.env.BROWSER) {
  browserHistory = createBrowserHistory(); // eslint-disable-line
}
export const history = browserHistory;
export const store = configureStore(window.INITIAL_STATE, history, rootReducer);  // eslint-disable-line

export default store;

if (process.env.BROWSER && process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./root.reducer', () => {
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
}
