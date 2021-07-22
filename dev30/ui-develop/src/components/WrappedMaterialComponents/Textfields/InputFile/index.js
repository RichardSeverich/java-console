import React from 'react';
import propTypes from 'prop-types';

/**
 * Material UI wrapped element for a simple input to upload files
 * @param  {string} id component identifier name
 * @param  {string} className CSS class name
 * @param  {string} type the input type
 * @param  {string} typeAccept the files type that input can upload
 * @param  {string} name the input name
 * @param  {boolean} required the flag that checks if the input is required
 */
function InputFile({
  id,
  className,
  type,
  typeAccept,
  name,
  required,
  onChange,
}) {
  function handleChange(event) {
    onChange(event.target.value);
  }
  return (
    <div>
      <label htmlFor={id}>
        <input
          id={id}
          className={className}
          name={name}
          type={type}
          accept={typeAccept}
          required={required}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

InputFile.prototype = {
  id: propTypes.string,
  className: propTypes.string,
  type: propTypes.string,
  typeAccept: propTypes.string,
  name: propTypes.string,
  onChange: propTypes.func,
};

InputFile.propDefaults = {
  id: '',
  className: '',
  type: '',
  typeAccept: '',
  name: '',
  onChange: () => {},
};

export default InputFile;
