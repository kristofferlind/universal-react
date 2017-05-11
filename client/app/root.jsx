import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import AppLayout from './app.layout';
import RequireAuthentication from './account/require.authentication';

const Root = ({ history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={RequireAuthentication(AppLayout)} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.object.isRequired,  // eslint-disable-line
  store: PropTypes.object.isRequired  // eslint-disable-line
};

export default Root;
