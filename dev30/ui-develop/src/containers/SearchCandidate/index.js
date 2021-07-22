import React from 'react';
import SearchCandidatesComponent from 'app/components/SearchCandidates';
import CandidateDetails from 'app/components/CandidateDetails';
import CandidateHistory from 'app/components/CandidateHistory';
import searchActions from 'actions/Search';
import candidatesActions from 'actions/Candidates';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ResultsTable from 'app/components/CandidatesResultEvaluations';
import activitiesEvaluations from 'actions/ActivitiesEvaluations';
import style from './style.module.css';

/**
 * Search Candidates Container which displays the component to search candidates
 * @param {Function} getCandidates function for search candidates
 * @param {Function} selectCandidate function to get a selected candidate
 * @param {object} resultCandidate object with the information of the selected candidate
 * @param {object} searchCandidates array of candidates, all candidates found
 * @param {object} notFoundError object when not found candidates
 * @param {Function} getEvaluations function to get evaluations result
 * @param {Array} evaluationsResults list of evaluations result
 * @param {Function} getCandidatePrograms function to get programas related to a candidate
 * @param {Array} historyCandidate list of programs related to a candidate
 */
function SearchCandidates({
  getCandidates,
  selectCandidate,
  resultCandidate,
  historyCandidate,
  searchCandidates,
  notFoundError,
  getEvaluations,
  getCandidatePrograms,
  evaluationsResults,
}) {
  function getCandidate(id) {
    selectCandidate(id);
    getEvaluations(id);
    getCandidatePrograms(id);
  }

  return (
    <div className={style.candidatesProfileContainer}>
      <SearchCandidatesComponent
        getCandidates={getCandidates}
        resultSearch={searchCandidates}
        selectCandidate={getCandidate}
        candidate={resultCandidate.firstName}
        notFoundError={notFoundError}
      />
      <div className={style.candidateDetailsContainer}>
        <div className={style.candidateDetailsFormContainer}>
          {resultCandidate.id && (
            <CandidateDetails
              firstNames={resultCandidate.firstName}
              lastNames={resultCandidate.lastName}
              email={resultCandidate.email}
              city={resultCandidate.city}
              cellphone={resultCandidate.cellphone}
              university={resultCandidate.university}
              career={resultCandidate.career}
              semester={resultCandidate.semester}
              birthDate={resultCandidate.birthdate}
              fullName={`${resultCandidate.firstName} ${resultCandidate.lastName}`}
            />
          )}
        </div>
      </div>
      <div className={style.candidateDetailsExtraInformation}>
        <div className={style.historyContainer}>
          <div>History</div>
          <hr />
          <div className={`${style.innerContainer} scrollbar`}>
            {historyCandidate && (
              <CandidateHistory history={historyCandidate} />
            )}
          </div>
        </div>
        <div className={style.extraDetailsContainer}>
          <div>Evaluations results</div>
          <hr />
          <div className={`${style.innerContainer} scrollbar`}>
            {resultCandidate.id && (
              <ResultsTable results={evaluationsResults} />
            )}
          </div>
        </div>
        <div className={style.extraDetailsContainer}>
          <div>Comments</div>
          <hr />
        </div>
      </div>
    </div>
  );
}

SearchCandidates.propTypes = {
  getCandidates: propTypes.func,
  selectCandidate: propTypes.func,
  searchCandidates: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
    })
  ),
  resultCandidate: propTypes.shape({}),
  getEvaluations: propTypes.func,
  evaluationsResults: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      activity: propTypes.string,
      program: propTypes.string,
      score: propTypes.number,
      setEvaluation: propTypes.string,
    })
  ),
  getCandidatePrograms: propTypes.func,
  historyCandidate: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      program: propTypes.string,
      status: propTypes.string,
    })
  ),
};

SearchCandidates.defaultProps = {
  getCandidates: () => {},
  selectCandidate: () => {},
  searchCandidates: [],
  resultCandidate: {},
};

function mapStateToProps(state) {
  const { searchCandidates } = state.search;
  const { notFoundError } = state.search.errors;
  const resultCandidate = state.candidates.selectedCandidate;
  const historyCandidate = state.candidates.candidatePrograms;
  const { evaluationsResults } = state.activitiesEvaluations;
  return {
    resultCandidate,
    searchCandidates,
    notFoundError,
    historyCandidate,
    evaluationsResults,
  };
}

function mapDispatchToProps(dispatch) {
  function getCandidates(value) {
    dispatch(searchActions.SEARCH_CANDIDATES(value));
  }
  function selectCandidate(id) {
    dispatch(candidatesActions.FETCH_CANDIDATE(id));
  }
  function getCandidatePrograms(candidateId) {
    dispatch(candidatesActions.GET_CANDIDATE_PROGRAMS(candidateId));
  }
  function getEvaluations(candidateId) {
    dispatch(activitiesEvaluations.GET_EVALUATIONS_RESULT(candidateId));
  }
  return {
    getCandidates,
    selectCandidate,
    getCandidatePrograms,
    getEvaluations,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCandidates);
