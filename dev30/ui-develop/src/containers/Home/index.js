import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from 'app/components/Home';
import loginActions from 'actions/Login';

/**
 * Displays the main view of the application
 * @param  {string} loggedUser string that represents the user email
 * @param  {function} logout function that consumes the logout service
 */
function Main({ loggedUser, logout }) {
  function handleLogout() {
    logout();
  }

  return <Home user={loggedUser} handleLogout={handleLogout} />;
}

Main.propTypes = {
  loggedUser: PropTypes.string,
  logout: PropTypes.func,
};

Main.defaultProps = {
  loggedUser: '',
  logout: () => {},
};

function mapStateToProps(state) {
  const loggedUser = state.login.user.email;
  return { loggedUser };
}
function mapDispatchToProps(dispatch) {
  function logout() {
    dispatch(loginActions.LOGOUT());
  }

  return { logout };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
