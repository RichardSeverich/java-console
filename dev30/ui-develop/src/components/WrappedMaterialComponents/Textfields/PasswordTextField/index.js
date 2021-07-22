/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import validator from 'app/helpers/stringValidator';
/**
 * Wrapped Material UI text field cutomized for password with a show password button
 * @param  {string} className CSS class name for the component
 * @param  {string} label label of the text field
 * @param  {string} id id of the element
 * @param  {function} onChange function called when the text field value changes
 */
function PasswordTextField({ className, id, label, onChange }) {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const labelWidth = validator.getStringWidth(label);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    onChange(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl className={className} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        labelWidth={labelWidth}
        // eslint-disable-next-line prettier/prettier
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
          // eslint-disable-next-line prettier/prettier
        )}
      />
    </FormControl>
  );
}

PasswordTextField.prototype = {
  className: propTypes.string,
  label: propTypes.string,
  id: propTypes.string,
  onChange: propTypes.func,
};

PasswordTextField.propDefaults = {
  className: '',
  label: '',
  id: '',
  onChange: () => {},
};

export default PasswordTextField;
