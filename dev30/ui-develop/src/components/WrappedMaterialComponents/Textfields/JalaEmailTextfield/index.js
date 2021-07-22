import React, { useState } from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import validators from 'app/helpers/stringValidator';
import debounce from 'app/helpers/debounce';
/**
 * Wrapped Material UI text field cutomized for a jala valid email
 * @param  {string} className CSS class name for the component
 * @param  {string} label label of the text field
 * @param  {function} onChange function called when the text field value changes
 */
function EmailTextField({ className, label, onChange }) {
  const [emailData, setEmailData] = useState('');
  const [error, setError] = useState(false);

  function sendData(email) {
    if (validators.validateJalaFoundationEmail(email)) {
      onChange(email);
    } else {
      onChange('');
    }
  }

  function validateEmail(email) {
    setError(false);
    debounce(() => {
      setError(!validators.validateJalaFoundationEmail(email));
    }, 1000);
  }

  function handleChange(event) {
    setEmailData(event.target.value);
    validateEmail(event.target.value);
    sendData(event.target.value);
  }

  return (
    <TextField
      error={error}
      className={className}
      value={emailData}
      id="outlined-helperText"
      label={label}
      variant="outlined"
      onChange={handleChange}
    />
  );
}

EmailTextField.prototype = {
  className: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func,
};

EmailTextField.propDefaults = {
  className: '',
  label: '',
  onChange: () => {},
};

export default EmailTextField;
