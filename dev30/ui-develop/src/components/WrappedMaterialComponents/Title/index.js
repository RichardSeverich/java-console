import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
/**
 * A default Material UI component wrapped
 * @param  {string} className css class name of the component
 * @param  {string} label label that will display on the title
 * @param  {string} id id that is for identification
 * @param  {string} variant variant that is size to title
 */
function Title({ className, id, label, variant, gutterBottom }) {
  return (
    <Typography
      data-testid={id}
      className={className}
      id={id}
      variant={variant}
      gutterBottom={gutterBottom}
    >
      {label}
    </Typography>
  );
}

Title.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.string,
};

Title.defaultProps = {
  className: '',
  label: '',
  id: '',
  variant: '',
};

export default Title;
