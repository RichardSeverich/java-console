import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginActions from 'actions/Login';
import programActions from 'actions/Program';
import CookiesService from 'app/services/CookieService';

/**
 * Loads all nessesary information for the router in case of a specific cookie exist
 * @param  {function} isLogin reloads the state of the user if a cookie exists
 * @param  {function} getPrograms loads the programs list if a user is in session
 */
function Root({ isLogin, getPrograms }) {
  const readCookies = () => {
    if (CookiesService.getCookie('token')) {
      isLogin();
      getPrograms();
    }
  };

  const callLoginCookieInfo = useMemo(readCookies, [getPrograms, isLogin]);

  useEffect(() => {
    callLoginCookieInfo;
  }, [callLoginCookieInfo]);

  return <div />;
}

Root.propTypes = {
  isLogin: PropTypes.func,
  getPrograms: PropTypes.func,
};

Root.propDefaults = {
  isLogin: () => {},
  getPrograms: () => {},
};

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  function isLogin() {
    dispatch(loginActions.ISLOGIN());
  }
  function getPrograms() {
    dispatch(programActions.FETCH_PROGRAMS());
  }
  return { isLogin, getPrograms };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
