import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
/**
 * A default Material UI component wrapped
 * @param  {string} className css class name of the component
 * @param  {string} label label that will display on the button
 * @param  {function} onClick function for when the button is clicked
 */
function DefaultButton({ className, label, onClick, disabled }) {
  return (
    <Button
      className={className}
      id="submit"
      variant="outlined"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

DefaultButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

DefaultButton.defaultProps = {
  className: '',
  label: '',
  onClick: () => {},
  disabled: false,
};

export default DefaultButton;
