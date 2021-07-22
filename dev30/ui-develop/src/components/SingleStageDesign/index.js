import React from 'react';
import style from './style.module.css';
/**
 * Displays the SingleStageDesign view of the application
 */
function SingleStageDesign({ children }) {
  return <div className={style.container}>{children}</div>;
}

SingleStageDesign.propTypes = {};

SingleStageDesign.defaultProps = {};

export default SingleStageDesign;
