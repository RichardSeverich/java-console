import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';
import InputMessage from 'components/WrappedMaterialComponents/Textfields/InputMessage';
import useValidation from 'app/hooks/Validation';
import style from './style.module.css';

/**
 * Material UI wrapped element for a date input
 * @param  {string} id component identifier name
 * @param  {string} value the input date
 * @param  {string} className CSS class name
 * @param  {boolean} required the flag that checks if the input is required
 * @param  {string} min the input of the minimum date
 * @param  {string} max the input of the maximum date
 * @param  {function} onChange function called when the text field value changes
 * @param  {boolean} disabled the flag that check is the input is disabled
 */
function InputDate({
  id,
  value,
  className,
  required,
  min,
  max,
  onChange,
  disabled,
}) {
  const inputDateId = `${id}-date`;
  const inputRef = useRef();
  const { valid, validate } = useValidation(inputRef);

  function handleChange(event) {
    validate();
    onChange(event.target.value);
  }
  return (
    <div className={style.inputTextField}>
      <TextField
        id={inputDateId}
        type="date"
        value={value || ''}
        error={valid}
        variant="outlined"
        disabled={disabled}
        required={required}
        inputRef={inputRef}
        className={className}
        onChange={handleChange}
        inputProps={{ min, max }}
        size="small"
      />
      {inputRef.current && (
        <InputMessage
          id={inputDateId}
          error={inputRef.current.validationMessage}
        />
      )}
    </div>
  );
}

InputDate.prototype = {
  id: propTypes.string,
  value: propTypes.string,
  className: propTypes.string,
  required: propTypes.bool,
  min: propTypes.string,
  max: propTypes.string,
  onChange: propTypes.func,
  disabled: propTypes.bool,
};

InputDate.propDefaults = {
  id: '',
  value: '',
  className: '',
  required: false,
  min: '',
  max: '',
  onChange: () => {},
  disabled: false,
};

export default InputDate;
