import React from 'react';
import propTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/**
 * Materual UI checkbox component wrapped
 * @param  {string} className CSS class name for the wrapped component
 * @param  {string} label label text of the checkbox
 * @param  {function} onClick function to be called when the checkbox is clicked
 * @param  {boolean} checked status in true or false of the checkbox
 * @param  {function} onChange function to be called when change status checkbox is clicked
 */
function DefaultCheckbox({
  className,
  label,
  onClick,
  disabled,
  checked,
  onChange,
}) {
  return (
    <FormControlLabel
      disabled={disabled}
      className={className}
      control={<Checkbox value="remember" color="primary" onClick={onClick} />}
      label={label}
      checked={checked}
      onChange={onChange}
    />
  );
}

DefaultCheckbox.prototype = {
  className: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  checked: propTypes.bool,
};

DefaultCheckbox.propDefaults = {
  className: '',
  label: '',
  disabled: false,
  onChange: () => {},
  checked: false,
};

export default DefaultCheckbox;
