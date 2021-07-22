import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';
/**
 * Activity display all details of an activity
 * @param  {string} name property name of the activity
 * @param  {string} location property location of the activity
 * @param  {string} time property time of the activity
 * @param  {string} type property type of the activity
 * @param  {string} status property status of the activity
 */
function Activity({ name, location, date, type, status }) {
  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <p>{name}</p>
        <p>{location}</p>
        <p>{type}</p>
        <p>{date}</p>
        <p>{status}</p>
      </div>
    </div>
  );
}

Activity.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
};

Activity.propDefaults = {
  name: '',
  location: '',
  date: '',
  status: '',
  type: '',
};

export default Activity;
