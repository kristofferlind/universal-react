import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Root from './root';
import socketSetup from './socket.service';
import { history, store } from './store';
import '../styles/main.scss';

socketSetup(store);

const App = () => (
  <BrowserRouter>
    <Root history={history} store={store} />
  </BrowserRouter>
);

export default App;
