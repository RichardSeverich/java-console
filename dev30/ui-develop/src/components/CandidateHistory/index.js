import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

/**
 * CandidateHistory display the component with a list of results from the candidate
 * @param {History[]} history contain all evaluations results of the candidate
 * * @param {number} CandidateHistory.id is a identifier of a result
 * * @param {string} CandidateHistory.program is the program of the result
 * * @param {string} CandidateHistory.status is the status obtained of the result
 */
function CandidateHistory({ history }) {
  return (
    <ul className={style.resultList}>
      {history.map((item) => (
        <li key={item.id} className={style.result}>
          {item.program} ({item.status})
        </li>
      ))}
    </ul>
  );
}

CandidateHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      program: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

CandidateHistory.propDefault = {
  history: [],
};

export default CandidateHistory;
