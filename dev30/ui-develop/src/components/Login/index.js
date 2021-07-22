import React from 'react';
import PropTypes from 'prop-types';
import PasswordTextfield from 'app/components/WrappedMaterialComponents/Textfields/PasswordTextField';
import EmailTextfield from 'app/components/WrappedMaterialComponents/Textfields/JalaEmailTextfield';
import Checkbox from 'app/components/WrappedMaterialComponents/Checkboxes/DefaultCheckbox';
import Button from 'app/components/WrappedMaterialComponents/Buttons/DefaultButton';
import Alert from 'app/components/WrappedMaterialComponents/Alert/DefaultAlert';
import Link from '@material-ui/core/Link';
import style from './style.module.css';
/**
 * Login view, where the user fills their email and password
 * @param  {string} errorMessage Error message to be show, or not if it is empty
 * @param  {function} onTextChange To be called when valid text is written in any of the text fields
 * @param  {function} handleRemember handle the Remember Me checkbox
 * @param  {function} handleLogin Called when a the sign in button is clicked
 * @param  {function} handleSignUp Called when a the sing up button is clicked
 */
function LoginForm({
  errorMessage,
  onTextChange,
  handleRemember,
  handleLogin,
  handleSingUp,
}) {
  return (
    <div className={style.container}>
      <div className={style.border}>
        <div className={style.row}>
          <div className={style.logo} />
        </div>
        <div className={style.row}>
          <div className={style.title}>SIGN IN</div>
        </div>
        <form className={style.form} noValidate autoComplete="off">
          <div className={style.row}>
            {errorMessage && <Alert severity="error" message={errorMessage} />}
          </div>
          <div className={style.row}>
            <EmailTextfield
              className={style.input}
              label="JALA Foundation Email"
              onChange={onTextChange('username')}
            />
          </div>
          <div className={style.row}>
            <PasswordTextfield
              className={style.input}
              label="Password"
              id="Password"
              onChange={onTextChange('password')}
            />
          </div>
          <div className={style.row}>
            <Checkbox
              className={style.checkbox}
              label="Remember Me"
              onClick={handleRemember}
            />
          </div>
          <div className={style.row}>
            <Button
              className={style.button}
              label="Sign In"
              onClick={handleLogin}
            />
          </div>
          <div className={style.row}>
            <Link className={style.Link} href="#top">
              Sign up for reSoft account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  onTextChange: PropTypes.func,
  handleRemember: PropTypes.func,
  handleLogin: PropTypes.func,
  handleSingUp: PropTypes.func,
};

LoginForm.propDefaults = {
  errorMessage: '',
  onTextChange: () => {},
  handleRemember: () => {},
  handleLogin: () => {},
  handleSingUp: () => {},
};

export default LoginForm;
