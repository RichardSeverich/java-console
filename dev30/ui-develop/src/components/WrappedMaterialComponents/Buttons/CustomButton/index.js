import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

/**
 * A default Material UI component wrapped
 * @param  {string} id component identifier name
 * @param  {string} className css class name of the component
 * @param  {string} label label that will display on the button
 * @param  {function} onClick function for when the button is clicked
 */
function CustomButton({ id, className, label, onClick, disabled }) {
  return (
    <div>
      <Button
        id={id}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </div>
  );
}

CustomButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

CustomButton.defaultProps = {
  id: '',
  className: '',
  label: '',
  onClick: () => {},
  disabled: false,
};

export default CustomButton;
