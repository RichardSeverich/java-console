import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

/**
 * Message component for displaying messages
 * @param {string} text of the message to display
 */
function Message({ text }) {
  return <div className={style.messageContainer}>{text}</div>;
}

Message.propTypes = {
  text: PropTypes.string,
};

Message.defaultProps = {
  text: '',
};

export default Message;
