import React from 'react';
import SpinnerComponent from 'components/WrappedMaterialComponents/Spinner';
import style from './style.module.css';

/**
 * Loading component that displays a spinner, to represent a loading screen
 */
function Loading() {
  return (
    <div className={style.container}>
      <div className={style.spinner}>
        <SpinnerComponent size={50} />
      </div>
    </div>
  );
}

export default Loading;
