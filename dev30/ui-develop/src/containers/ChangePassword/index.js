import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChangePassComponent from 'app/components/ChangePassword';
import loginActions from 'actions/Login';
import validators from 'app/helpers/stringValidator';
import AuthService from 'app/services/AuthService';
import CookiesService from 'app/services/CookieService';
import EnterKeyListenner from 'app/helpers/KeyListenner';

/**
 * Displays the main view of the application
 * * @param  {object} changePasswordError error state for the change password function
 * * * @param  {number} changePasswordError.code numeric code of the error
 * * * @param  {string} changePasswordError.message string description message of the error to be displayed.
 * @param  {function} changePassword function that consumes the change password middleware
 * @param  {function} setError set an error on the reducer
 */
function ChangePassword({ changePasswordError, changePassword, setError }) {
  const [values, setValues] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const changePassCookie = CookiesService.getCookie('temporal_token');

  const handleTextChange = (prop) => (value) => {
    setValues({ ...values, [prop]: value });
  };

  function allDataFilled() {
    return (
      !validators.isEmpty(values.currentPassword) &&
      !validators.isEmpty(values.newPassword) &&
      !validators.isEmpty(values.confirmPassword)
    );
  }

  function canUserBeSet() {
    return (
      CookiesService.getCookie('temporal_token') &&
      validators.isEmpty(values.email)
    );
  }

  function sessionHasExpired() {
    return changePasswordError.code === 403;
  }

  function handleUpdate() {
    if (allDataFilled()) {
      changePassword(values);
    } else {
      setError({
        changePassword: {
          code: '',
          message: 'Missing fields, Please try again',
        },
      });
    }
  }

  if (canUserBeSet()) {
    try {
      const cookieEmail = AuthService.decodeToken(changePassCookie).sub;
      handleTextChange('email')(cookieEmail);
    } catch (error) {
      CookiesService.removeCookie('temporal_token');
    }
  }

  if (sessionHasExpired()) {
    CookiesService.removeCookie('temporal_token');
  }

  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(e) => EnterKeyListenner(e, handleUpdate)}
    >
      {!changePassCookie && <Redirect to="/login" />}
      <ChangePassComponent
        errorMessage={changePasswordError.message}
        username={values.email}
        handleTextChange={handleTextChange}
        handleButtonClick={handleUpdate}
      />
    </div>
  );
}

ChangePassword.propTypes = {
  changePasswordError: PropTypes.shape({}),
  changePassword: PropTypes.func,
  setError: PropTypes.func,
};

ChangePassword.defaultProps = {
  changePasswordError: {},
  changePassword: () => {},
  setError: () => {},
};

function mapStateToProps(state) {
  const changePasswordError = state.login.errors.changePassword;
  return { changePasswordError };
}

function mapDispatchToProps(dispatch) {
  function logout() {
    dispatch(loginActions.LOGOUT());
  }
  function changePassword(user) {
    dispatch(loginActions.CHANGE_PASSWORD(user));
  }
  function setError(error) {
    dispatch(loginActions.SET_ERRORS(error));
  }
  return { logout, changePassword, setError };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
