import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import Root from './root';
import configureStore from './store';
import socketSetup from './socket.service';
import rootReducer from './root.reducer';
import '../styles/main.scss';

const history = createBrowserHistory();
const store = configureStore(window.INITIAL_STATE, history, rootReducer);  // eslint-disable-line
socketSetup(store);

const App = () => (
  <BrowserRouter>
    <Root history={history} store={store} />
  </BrowserRouter>
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./root.reducer', () => {
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
}

export default App;
