import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';
/**
 * Material UI wrapped element for a description input
 * @param  {string} id component identifier
 * @param  {string} programDescription the input program description
 * @param  {string} className CSS class name
 * @param  {string} placeholder the placeholder on the text field
 * @param  {string} label the label on the text field
 * @param  {number} rows the rows on the number field
 * @param  {function} onChange function called when the text field value changes
 */
function Textarea({
  id,
  programDescription,
  className,
  placeholder,
  label,
  rows,
  onChange,
}) {
  const [value, setValue] = useState(programDescription);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    setValue(programDescription);
  }, [programDescription]);

  return (
    <TextField
      id={id}
      value={value}
      multiline
      rows={rows}
      placeholder={placeholder}
      label={label}
      variant="outlined"
      onChange={handleChange}
      className={className}
    />
  );
}

Textarea.prototype = {
  id: propTypes.string,
  programDescription: propTypes.string,
  className: propTypes.string,
  placeholder: propTypes.string,
  label: propTypes.string,
  rows: propTypes.number,
  onChange: propTypes.func,
};

Textarea.propDefaults = {
  id: '',
  programDescription: '',
  className: '',
  placeholder: '',
  label: '',
  rows: '',
  onChange: '',
};

export default Textarea;
