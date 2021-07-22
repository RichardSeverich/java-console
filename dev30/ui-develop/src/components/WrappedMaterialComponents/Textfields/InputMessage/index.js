import React from 'react';
import { FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style.module.css';

/**
 * InputMessage component shows a message of error of the input
 * @param  {string} id is a identifier of the InputMessage component
 * @param  {object} refInput is a reference of the input tag.
 * @param  {string} error is a error message when the text is empty
 */
function InputMessage({ id, error }) {
  return (
    <div>
      {error && (
        <FormHelperText
          className={style.helperText}
          id={`${id}-helper-text`}
          variant="outlined"
          error
        >
          {error}
        </FormHelperText>
      )}
    </div>
  );
}

InputMessage.prototype = {
  refInput: PropTypes.object,
  error: PropTypes.string,
};

InputMessage.defaultProps = {
  refInput: {},
  error: '',
};
export default InputMessage;
