import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationActions from './navigation.actions';

const Link = ({ to, currentPath, children, navigationActions }) => {
  const isActive = to === currentPath;
  const navigate = (event) => {
    event.preventDefault();
    navigationActions.navigate(to);
  };
  return (
    <a href={to} className={classnames({ 'is-active': isActive })} onClick={navigate}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  children: PropTypes.any, // eslint-disable-line
  navigationActions: PropTypes.object.isRequired // eslint-disable-line
};

export default connect(
  state => ({ currentPath: state.router.location.pathname }),
  dispatch => ({ navigationActions: bindActionCreators(NavigationActions, dispatch) })
)(Link);
