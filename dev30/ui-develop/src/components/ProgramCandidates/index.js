import React from 'react';
import PropTypes from 'prop-types';
import CustomTable from 'components/Table';
import Message from 'components/Message';
import DefaultCheckbox from 'components/WrappedMaterialComponents/Checkboxes/DefaultCheckbox';
import style from './style.module.css';

/**
 * ProgramCandidates display the component with a list of candidates
 * @param {Candidate[]} candidates contain all candidates of the program
 * * @param {number} Candidate.id is a identifier of a candidate
 * * @param {string} Candidate.fullName is the name and lastName of a candidate
 * * @param {string} Candidate.email is the email of a candidate
 * * @param {string} Candidate.cellphone is the cellPhone of a candidate
 * * @param {string} Candidate.lastActivity is the name of the last activity
 * * @param {string} Candidate.status is the state of a candidate
 * @param {function} countCandidates function it is selector that count candidates by status
 * @param {function} checkStatus object that holds the status of the buttons
 * * @param {boolean} checkStatus.active status of the active candidates
 * * @param {boolean} checkStatus.dismissed status of the dismissed candidates
 * * @param {boolean} checkStatus.licensed status of the licensed candidates
 * @param {function} onChangeStatus function that changes the status of the buttons
 */
function ProgramCandidates({
  candidates,
  countCandidates,
  checkStatus,
  onChangeStatus,
}) {
  const header = [
    { name: 'Full Name', render: (item) => item.fullName },
    { name: 'Email', render: (item) => item.email },
    { name: 'Cellphone', render: (item) => item.cellphone },
    { name: 'Activity', render: (item) => item.lastActivity },
    { name: 'Status', render: (item) => item.status },
  ];
  const hasElements = Boolean(
    countCandidates.active +
      countCandidates.dismissed +
      countCandidates.licensed
  );

  return (
    <div className={style.container}>
      {hasElements ? (
        <>
          <div className={style.header}>
            <h3 className={style.title}>Candidates</h3>
            <div>
              <DefaultCheckbox
                label={`Active (${countCandidates.active})`}
                checked={checkStatus.active}
                onChange={() => onChangeStatus('active', checkStatus.active)}
                value={checkStatus.active}
                disabled={Boolean(!countCandidates.active)}
              />
              <DefaultCheckbox
                label={`Dismissed (${countCandidates.dismissed})`}
                checked={checkStatus.dismissed}
                onChange={() =>
                  onChangeStatus('dismissed', checkStatus.dismissed)
                }
                disabled={Boolean(!countCandidates.dismissed)}
              />
              <DefaultCheckbox
                label={`Licensed (${countCandidates.licensed})`}
                checked={checkStatus.licensed}
                onChange={() =>
                  onChangeStatus('licensed', checkStatus.licensed)
                }
                disabled={Boolean(!countCandidates.licensed)}
              />
            </div>
          </div>
          <div className={`${style.innerContainer}  scrollbar`}>
            <CustomTable headers={header} data={candidates} />
          </div>
        </>
      ) : (
        <Message text="No candidates" />
      )}
    </div>
  );
}

ProgramCandidates.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      fullName: PropTypes.string,
      email: PropTypes.string,
      cellphone: PropTypes.string,
      lastActivity: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  countCandidates: PropTypes.shape({
    dismissed: PropTypes.number,
    licensed: PropTypes.number,
    active: PropTypes.number,
  }),
  checkStatus: PropTypes.shape({
    dismmised: PropTypes.bool,
    licensed: PropTypes.bool,
    active: PropTypes.bool,
  }),
  onChangeStatus: PropTypes.func,
};
ProgramCandidates.propDefault = {
  candidates: [],
  countCandidates: {
    dismissed: 0,
    licensed: 0,
    active: 0,
  },
  checkStatus: {
    dismissed: true,
    licensed: true,
    active: true,
  },
  onChangeStatus: () => {},
};

export default ProgramCandidates;
