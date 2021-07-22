import React from 'react';
import PropTypes from 'prop-types';
import CustomTable from 'components/Table';

/**
 * EvaluationsResult display the component with a list of results from the candidate
 * @param {Result[]} results contain all evaluations results of the candidate
 * * @param {number} EvaluationResult.id is a identifier of a result
 * * @param {string} EvaluationResult.activity is the activity of the result
 * * @param {string} EvaluationResult.program is the program of the result
 * * @param {string} EvaluationResult.score is the score obtained of the result
 * * @param {string} EvaluationResult.setEvaluation is the set to which result belongs
 */
function EvaluationsResult({ results }) {
  const headers = [
    { name: 'Program', render: (item) => item.program },
    { name: 'Activity', render: (item) => item.activity },
    { name: 'Exam', render: (item) => item.title },
    { name: 'Set', render: (item) => item.setEvaluation },
    { name: 'Score', render: (item) => item.score },
  ];

  return <CustomTable headers={headers} data={results} />;
}

EvaluationsResult.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      activity: PropTypes.string,
      program: PropTypes.string,
      score: PropTypes.number,
      setEvaluation: PropTypes.string,
    })
  ),
};

EvaluationsResult.propDefault = {
  results: [],
};

export default EvaluationsResult;
