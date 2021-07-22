import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import validators from 'app/helpers/stringValidator/index';
import Avatar from '@material-ui/core/Avatar';
/**
 * Avatar that displays a picture or an initial depending on the props
 * @param  {string} email the display name of the user that logged in
 * @param  {string} src source of the image of the avatar
 */
function DefaultAvatar({ email, src }) {
  const [text, setText] = useState('');
  useEffect(() => {
    validators.isEmpty(email) ? setText('?') : setText(email.charAt(0));
  }, [email]);
  return <Avatar src={src}>{text}</Avatar>;
}

DefaultAvatar.propTypes = {
  email: PropTypes.string,
  src: PropTypes.string,
};

DefaultAvatar.defaultProp = {
  email: '',
  src: '',
};

export default DefaultAvatar;
