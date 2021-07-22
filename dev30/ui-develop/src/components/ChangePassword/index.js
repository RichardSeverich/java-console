import React from 'react';
import PropTypes from 'prop-types';
import PasswordTextfield from 'components/WrappedMaterialComponents/Textfields/PasswordTextField';
import Button from 'components/WrappedMaterialComponents/Buttons/DefaultButton';
import Alert from 'app/components/WrappedMaterialComponents/Alert/DefaultAlert';
import style from './style.module.css';

function ChangePasswordModal({
  errorMessage,
  username,
  handleTextChange,
  handleButtonClick,
}) {
  return (
    <div className={style.container}>
      <div className={style.border}>
        <div className={style.row}>
          <div className={style.logo} />
        </div>
        <div className={style.row}>
          <br className={style.spacer} />
        </div>
        <div className={style.row}>
          <div>First time login</div>
          <div>Please update your password</div>
        </div>
        <form className={style.form} noValidate autoComplete="off">
          <div className={style.row}>
            {errorMessage && <Alert severity="error" message={errorMessage} />}
          </div>
          <div className={style.row}>User: {username}</div>
          <div className={style.row}>
            <PasswordTextfield
              className={style.input}
              label="Current Password"
              id="Current Password"
              onChange={handleTextChange('currentPassword')}
            />
          </div>
          <div className={style.row}>
            <PasswordTextfield
              className={style.input}
              label="New Password"
              id="New Password"
              onChange={handleTextChange('newPassword')}
            />
          </div>
          <div className={style.row}>
            <PasswordTextfield
              className={style.input}
              label="Confirm Password"
              id="Confirm Password"
              onChange={handleTextChange('confirmPassword')}
            />
          </div>
          <div className={style.row}>
            <Button
              className={style.button}
              label="Update password"
              onClick={handleButtonClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

ChangePasswordModal.propTypes = {
  errorMessage: PropTypes.string,
  username: PropTypes.string,
  handleTextChange: PropTypes.func,
  handleButtonClick: PropTypes.func,
};

ChangePasswordModal.defaultProps = {
  errorMessage: '',
  username: '',
  handleTextChange: () => {},
  handleButtonClick: () => {},
};

export default ChangePasswordModal;
