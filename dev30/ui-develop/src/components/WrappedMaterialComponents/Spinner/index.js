import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * A default Material UI component wrapped
 * @param  {string} id component identifier name
 * @param  {number} size determines the size of the spinner component
 */
function Spinner({ id, size }) {
  return <CircularProgress id={id} size={size} />;
}

Spinner.propTypes = {
  id: PropTypes.string,
  size: PropTypes.number,
};

Spinner.defaultProps = {
  id: '',
  size: '',
};

export default Spinner;
