import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import asyncBootstrap from '../components/async-bootstrap';
import App from './app';

const contentElement = document.getElementById('content');

const renderApp = () => render((
  <AppContainer>
    <App />
  </AppContainer>
), contentElement);

if (process.env.NODE_ENV === 'production') {
  asyncBootstrap(App).then(renderApp);
} else {
  renderApp();
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./root', renderApp);
}
