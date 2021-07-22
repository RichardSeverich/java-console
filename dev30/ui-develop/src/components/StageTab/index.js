import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import dateFormat from 'app/helpers/DateParser';
import style from './style.module.css';

/**
 * Displays a tag options that represents the stages of a program
 * @param {number} id is the id of the program stage
 * @param {number} order is the order of the program stage
 * @param {string} name is the name of the stage
 * @param {string} startDate is the start date of the stage
 */
function StageTag({ id, order, name, startDate }) {
  const currentDate = dateFormat.getCurrentDate();
  const startDateFormat = dateFormat.getMonthAndDay(startDate);

  const tooltip = (name, color) => (
    <Tooltip title={name}>
      <div className={`${style.content} ${color}`}>
        <div className={style.textContainer}>{name}</div>
      </div>
    </Tooltip>
  );

  function renderToolTip(startDate, currentDate, name) {
    if (startDate === currentDate) {
      return tooltip(name, style.current);
    }

    if (startDate > currentDate) {
      return tooltip(name, style.future);
    }

    return tooltip(name, style.passed);
  }

  return (
    <div className={style.container}>
      {renderToolTip(startDate, currentDate, name)}
      {startDate && (
        <div className={style.dateContainer}>
          <div className={style.date}>{startDateFormat}</div>
        </div>
      )}
    </div>
  );
}

StageTag.propTypes = {
  id: PropTypes.number,
  order: PropTypes.number,
  name: PropTypes.string,
};

StageTag.defaultProps = {
  id: null,
  order: null,
  name: '',
};

export default StageTag;
