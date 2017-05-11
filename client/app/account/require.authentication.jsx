import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginView from './login.view';
import accountActions from './account.actions';

export default (ChildComponent) => {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      const { account } = this.props;
      if (account.loggedIn && !account.isFetching && !account.user.name) {
        this.props.dispatch(accountActions.loadUser());
      }
    }
    render() {
      const { account } = this.props;
      return (account.loggedIn ?
        <ChildComponent {...this.props} /> :
        <LoginView />
      );
    }
  }
  AuthenticatedComponent.propTypes = {
    account: PropTypes.object.isRequired, // eslint-disable-line
    dispatch: PropTypes.func.isRequired
  };
  const select = state => ({ account: state.account });
  return connect(select)(AuthenticatedComponent);
};
