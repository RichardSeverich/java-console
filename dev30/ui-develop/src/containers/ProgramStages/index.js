import React from 'react';
import PropTypes from 'prop-types';
import StageTag from 'app/components/StageTab';
import Message from 'app/components/Message';
import dateFormat from 'app/helpers/DateParser';
import style from './style.module.css';

/**
 * Display program stages
 * @param  {array} stages is the list of program stages to display
 * @param  {object} endDate is the end date of the program
 */
function ProgramStages({ stages, endDate }) {
  const endDateFormat = dateFormat.getMonthAndDay(endDate);
  const hasElements = Boolean(stages.length);
  return (
    <div className={style.container}>
      {hasElements ? (
        <div className="programstages">
          {stages.map((stage) => {
            return (
              <StageTag
                key={stage.id}
                id={stage.id}
                name={stage.name}
                order={stage.order}
                startDate={stage.startDate}
              />
            );
          })}
          {endDate && <span className={style.endDate}>{endDateFormat}</span>}
        </div>
      ) : (
        <Message text="No stages defined" />
      )}
    </div>
  );
}

ProgramStages.propTypes = {
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      order: PropTypes.number,
    })
  ),
  endDate: PropTypes.shape({}),
};

ProgramStages.defaultProps = {
  stages: [],
  endDate: {},
};

export default ProgramStages;
