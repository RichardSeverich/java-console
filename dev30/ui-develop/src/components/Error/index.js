import React from 'react';
import PropTypes from 'prop-types';
import Button from 'app/components/WrappedMaterialComponents/Buttons/DefaultButton';
import { useHistory } from 'react-router-dom';
import errorMessages from 'app/helpers/ErrorHelper';
import style from './style.module.css';

/**
 * Display error in a page that covers the entire page, with a return home button.
 * @param  {string} code Error code of the error
 * @param  {string} message Message of the error
 **/
function ErrorPage({ code, message }) {
  const history = useHistory();
  function handleRedirect() {
    history.push('/home');
  }
  return (
    <div className={style.container}>
      <div className={style.bigText}>{code}</div>
      <div className={style.smallText}>
        {!message ? errorMessages(code) : message}
      </div>
      <div className={style.buttonContainer}>
        <Button
          id="redirectButton"
          className={style.button}
          label="Return to home"
          onClick={handleRedirect}
        />
      </div>
    </div>
  );
}

ErrorPage.prototype = {
  code: PropTypes.string,
  message: PropTypes.string,
};

ErrorPage.defaultProps = {
  code: '',
  message: '',
};

export default ErrorPage;
