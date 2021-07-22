import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
/**
 * Avatar that displays a picture or an initial depending on the props
 * @param  {string} severity the display name of the user that logged in
 * @param  {string} message source of the image of the avatar
 */
function DefaultAlert({ severity, message }) {
  return <Alert severity={severity}>{message}</Alert>;
}

DefaultAlert.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
};

DefaultAlert.defaultProp = {
  severity: '',
  message: '',
};

export default DefaultAlert;
