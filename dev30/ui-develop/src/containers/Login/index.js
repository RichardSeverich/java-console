import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginComponent from 'app/components/Login';
import loginActions from 'actions/Login';
import User from 'app/mappers/User';
import validators from 'app/helpers/stringValidator';
import CookiesService from 'app/services/CookieService';
import EnterKeyListenner from 'app/helpers/KeyListenner';

/**
 * Displays the main view of the application
 * * @param  {object} loginError error state for the login function
 * * * @param  {number} loginError.code numeric code of the error
 * * * @param  {string} loginError.message string description message of the error to be displayed.
 * @param  {function} login function that consumes the login service
 * @param  {function} setError set an error on the reducer
 */
function LoginContainer({ loginError, login, setError }) {
  const [values, setValues] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (prop) => (value) => {
    setValues({ ...values, [prop]: value });
  };

  function handleRemember() {
    setValues({ ...values, rememberMe: !values.rememberMe });
  }

  function checkIfInputsAreEmpty() {
    return (
      validators.isEmpty(values.username) || validators.isEmpty(values.password)
    );
  }

  function handleLogin() {
    if (!checkIfInputsAreEmpty()) {
      login(new User(values.username, values.password));
    } else {
      setError({
        login: {
          code: '',
          message: 'Empty or wrong values, Please try again',
        },
      });
    }
  }

  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(e) => EnterKeyListenner(e, handleLogin)}
    >
      {CookiesService.getCookie('temporal_token') && <Redirect to="/change" />}
      <LoginComponent
        errorMessage={loginError.message}
        onTextChange={handleChange}
        handleRemember={handleRemember}
        handleLogin={handleLogin}
      />
    </div>
  );
}

LoginContainer.propTypes = {
  loginError: PropTypes.shape({}),
  login: PropTypes.func,
  setError: PropTypes.func,
};

LoginContainer.defaultProps = {
  loginError: {},
  login: () => {},
  setError: () => {},
};

function mapStateToProps(state) {
  const loginError = state.login.errors.login;
  return { loginError };
}
function mapDispatchToProps(dispatch) {
  function login(user) {
    dispatch(loginActions.LOGIN(user));
  }
  function setError(error) {
    dispatch(loginActions.SET_ERRORS(error));
  }
  return { login, setError };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
