import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import InputMessage from 'components/WrappedMaterialComponents/Textfields/InputMessage';
import useValidation from 'app/hooks/Validation';
import style from './style.module.css';

/**
 * Material UI wrapped element for a text input
 * @param  {string} id component identifier name
 * @param  {string} value the input text
 * @param  {string} className CSS class name
 * @param  {function} onChange function called when the text field value changes
 * @param  {boolean} disabled the flag that check is the input is disabled
 * @param  {boolean} required the flag that checks if the input is required
 * @param  {string} pattern is a regular expression for matching the text
 */
function InputText({
  id,
  value,
  className,
  onChange,
  disabled,
  required,
  pattern,
}) {
  const inputTextId = `${id}-text`;
  const inputRef = useRef();
  const { valid, validate } = useValidation(inputRef);

  function handleChange(event) {
    validate();
    onChange(event.target.value);
  }

  return (
    <div className={style.inputTextField}>
      <TextField
        id={inputTextId}
        type="text"
        value={value || ''}
        error={valid}
        variant="outlined"
        disabled={disabled}
        inputRef={inputRef}
        required={required}
        className={className}
        inputProps={{ pattern }}
        onChange={handleChange}
        size="small"
      />
      {inputRef.current && (
        <InputMessage
          id={inputTextId}
          error={inputRef.current.validationMessage}
        />
      )}
    </div>
  );
}

InputText.prototype = {
  id: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

InputText.propDefaults = {
  id: '',
  value: '',
  className: '',
  pattern: '',
  required: true,
  onChange: () => {},
  disabled: false,
};

export default InputText;
