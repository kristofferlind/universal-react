import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UnAuthorizedView from './unauthorized.view';

export default (ChildComponent, role) => {
  const AuthenticatedComponent = ({ account }) =>
    (account.role === role ?
      <ChildComponent {...this.props} /> :
      <UnAuthorizedView />
    );

  AuthenticatedComponent.propTypes = {
    account: PropTypes.object.isRequired // eslint-disable-line
  };

  const select = state => ({ account: state.account });
  return connect(select)(AuthenticatedComponent);
};
