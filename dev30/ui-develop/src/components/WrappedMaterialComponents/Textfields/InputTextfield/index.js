import React, { useState } from 'react';
import propTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
/**
 * Material UI wrapped element for a simple text field
 * @param  {string} className CSS class name
 * @param  {string} type the material ui type if you want to customize it
 * @param  {string} label the label on the text field
 * @param  {function} onChange function to be called when the text field changes
 */
function InputTextField({ className, type, label, onChange }) {
  const [values, setValues] = useState({
    data: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    onChange(event.target.value);
  };

  return (
    <TextField
      className={className}
      value={values.data}
      id="outlined-helperText"
      label={label}
      variant="outlined"
      type={type}
      onChange={handleChange('data')}
    />
  );
}

InputTextField.prototype = {
  className: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  onChange: propTypes.func,
};

InputTextField.propDefaults = {
  className: '',
  label: '',
  type: '',
  onChange: () => {},
};

export default InputTextField;
