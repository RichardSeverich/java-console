import React from 'react';
import Button from 'app/components/WrappedMaterialComponents/Buttons/DefaultButton';
import { useHistory } from 'react-router-dom';
import style from './style.module.css';

function NotFound() {
  const history = useHistory();
  function handleRedirect() {
    history.push('/home');
  }
  return (
    <div className={style.container}>
      <div className={style.bigText}>404</div>
      <div className={style.smallText}>Page not found</div>
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

export default NotFound;
