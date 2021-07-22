import Title from 'components/WrappedMaterialComponents/Title';
import React from 'react';
import PropTypes from 'prop-types';
import ProgramStages from 'app/containers/ProgramStages';
import Message from 'components/Message';
import ProgramButtonList from 'app/components/ProgramButtonList';
import getLiteralMonth from 'app/helpers/MonthParser';
import getProgramStatus from 'app/helpers/ProgramStatusHelper';
import dateFormat from 'app/helpers/DateParser';
import styles from './style.module.css';
/**
 * ProgramProgress displays the program progress UI component including the Program.
 * @param {object} selectedProgram is a selected program.
 * @param {number} selectedProgram.id numeric identifier of the program
 * @param {string} selectedProgram.name the string name of the program
 * @param {string} selectedProgram.startDate the start date of the program
 * @param {string} selectedProgram.enDate the string end date of the program
 * @param {array} activities is a list of activities.
 * @param {array} stages is a list of stages.
 * @param {array} programs is a list of programs.
 * @param {string} pathWhitoutId the string is the current address without the ID.
 * @param {Candidate[]} candidates contain all candidates of the program
 * * @param {number} Candidate.id is a identifier of a candidate
 * * @param {string} Candidate.fullName is the name and lastName of a candidate
 * * @param {string} Candidate.email is the email of a candidate
 * * @param {string} Candidate.cellphone is the cellPhone of a candidate
 * * @param {string} Candidate.lastActivity is the name of the last activity
 * * @param {string} Candidate.status is the state of a candidate
 * @param  {object} checkStatus change the status check in true or false
 * * @param {boolean} checkStatus.active is a boolean check active
 * * @param {boolean} checkStatus.done is a boolean check done
 * * @param {boolean} checkStatus.pending is a boolean check pending
 * @param  {function} changeStatus it is function that change state checkStatus
 * @param  {array} activitiesFilter array of activities, each element will its properties
 */
function ProgramProgress({
  selectedProgram,
  activities,
  stages,
  programs,
  pathWhitoutId,
  renderCandidates,
  renderActivities,
}) {
  const nameProgram = 'nameProgram';
  const className = 'nameProgram';
  const programDates = 'programDates';
  const programStatus = 'programStatus';
  const size = 'h4';
  const datesSize = 'subtitle2';
  const statusSize = 'caption';
  const hasElements = Boolean(activities.length);

  const startDate = dateFormat.getDate(selectedProgram.startDate);
  const endDate = dateFormat.getDate(selectedProgram.endDate);

  const dates =
    startDate && endDate ? (
      <div className={styles.programDatesTitle}>
        <Title
          className={programDates}
          id={programDates}
          variant={datesSize}
          label={`${getLiteralMonth(
            startDate.getUTCMonth()
          )} ${startDate.getUTCFullYear()} ${'-'} ${getLiteralMonth(
            endDate.getUTCMonth()
          )} ${endDate.getUTCFullYear()}`}
        />
        <Title
          className={programStatus}
          id={programStatus}
          variant={statusSize}
          label={getProgramStatus(startDate, endDate)}
        />
      </div>
    ) : null;

  return (
    selectedProgram.name && (
      <div className={styles.container}>
        <ProgramButtonList
          programs={programs}
          path={pathWhitoutId}
          selectedProgram={selectedProgram}
        />
        <div className={styles.detailsProgram}>
          <div className={styles.programTitle}>
            <Title
              className={className}
              id={nameProgram}
              variant={size}
              label={selectedProgram.name}
              gutterBottom
            />
            {dates}
          </div>
          <div className={styles.container}>
            <div className={styles.detailsStatesActivities}>
              <ProgramStages stages={stages} endDate={endDate} />
              {hasElements ? (
                <> {renderActivities} </>
              ) : (
                <div className={styles.messageNoActivities}>
                  <Message text="No Activities defined" />
                </div>
              )}
            </div>
            <div className={styles.detailsCandidates}>{renderCandidates}</div>
          </div>
        </div>
      </div>
    )
  );
}

ProgramProgress.propTypes = {
  selectedProgram: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
};

ProgramProgress.defaultProps = {
  selectedProgram: {},
};

export default ProgramProgress;
