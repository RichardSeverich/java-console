import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import stagesActions from 'actions/Stages';
import programActions from 'actions/Program';
import activitiesActions from 'actions/Activities';
import { useRouteMatch, useParams } from 'react-router-dom';
import ProgramsProgressComponent from 'app/components/ProgramProgress';
import View from 'app/containers/View';
import Activities from 'app/components/Activities';
import candidatesActions from 'actions/Candidates';
import { countByStatus, filterByStatus } from 'app/selectors/Activities';
import ProgramCandidates from 'components/ProgramCandidates';
import {
  countCandidatesByStatus,
  filterCandidatesByStatus,
} from 'app/selectors/Candidates';
import { PENDING, DONE, ACTIVE } from 'app/constant/ActivitiesStatus';
import {
  CANDIDATE_DISMISSED,
  CANDIDATE_LICENSED,
  CANDIDATE_ACTIVE,
} from 'app/constant/CandidatesStatus';

/**
 * Displays the ProgramProgress view of the application
 * @param {object} selectedProgram is a selected program.
 * @param {number} selectedProgram.id numeric identifier of the program
 * @param {string} selectedProgram.name the string name of the program
 * @param {function} getProgramStages function that get stages of a program
 * @param {array} programStages is a list of stages of a program.
 * @param {array} activities is a list of activities.
 * @param {function} getPrograms function that get the list of programs.
 * @param {array} programs is a list of programs.
 * @param {function} getActivities function that get the list of activities.
 * @param {Candidate[]} candidates contain all candidates of the program
 * * @param {number} Candidate.id is a identifier of a candidate
 * * @param {string} Candidate.fullName is the name and lastName of a candidate
 * * @param {string} Candidate.email is the email of a candidate
 * * @param {string} Candidate.cellphone is the cellPhone of a candidate
 * * @param {string} Candidate.lastActivity is the name of the last activity
 * * @param {string} Candidate.status is the state of a candidate
 * @param {function} candidatesByStatus function it is selector that filter candidates by status
 * @param {function} countCandidates function it is selector that count candidates by status.
 * @param {function} activitiesByStatus function it is selector that filter by status
 * @param {function} countActivities function it is selector that count by status activity.
 */
function SingleProgram({
  selectedProgram,
  getProgramStages,
  programStages,
  activities,
  getProgram,
  programs,
  getActivities,
  getCandidates,
  candidates,
  candidatesByStatus,
  countCandidates,
  countActivities,
  activitiesByStatus,
}) {
  const [checkStatus, setCheckStatus] = useState({
    active: true,
    pending: true,
    done: true,
  });
  const [candidatesCheckStatus, setCandidateCheckStatus] = useState({
    active: true,
    dismissed: true,
    licensed: true,
  });

  const [filter, setFilter] = useState(candidates);
  const [candidatesFilter, setCandidatesFilter] = useState(candidates);

  const { url } = useRouteMatch();
  const { id } = useParams();
  const pathWhitoutId = url.slice(0, url.lastIndexOf('/'));

  const countActivitiesByStatus = {
    pending: countActivities(PENDING),
    done: countActivities(DONE),
    active: countActivities(ACTIVE),
  };

  const countCandidatesByStatusColumn = {
    active: countCandidates(CANDIDATE_ACTIVE),
    licensed: countCandidates(CANDIDATE_LICENSED),
    dismissed: countCandidates(CANDIDATE_DISMISSED),
  };

  const onChangeStatus = (prop, isCheck) => {
    setCheckStatus({ ...checkStatus, [prop]: !isCheck });
  };

  const onChangeCandidateStatus = (prop, isCheck) => {
    setCandidateCheckStatus({ ...candidatesCheckStatus, [prop]: !isCheck });
  };

  useEffect(() => {
    getProgram(id);
    getProgramStages(id);
    getActivities(id);
    getCandidates(id);
  }, [getProgram, id, getProgramStages, getActivities, getCandidates]);

  useEffect(() => {
    setFilter(activitiesByStatus(checkStatus));
    setCandidatesFilter(candidatesByStatus(candidatesCheckStatus));
  }, [
    checkStatus,
    activitiesByStatus,
    candidatesByStatus,
    candidatesCheckStatus,
  ]);

  const renderActivities = (
    <Activities
      activitiesList={filter}
      countActivities={countActivitiesByStatus}
      checkStatus={checkStatus}
      onChangeStatus={onChangeStatus}
    />
  );

  const renderCandidates = (
    <ProgramCandidates
      candidates={candidatesFilter}
      countCandidates={countCandidatesByStatusColumn}
      checkStatus={candidatesCheckStatus}
      onChangeStatus={onChangeCandidateStatus}
    />
  );

  const ProgramProgessComponent = (
    <ProgramsProgressComponent
      selectedProgram={selectedProgram}
      activities={activities}
      stages={programStages}
      programs={programs}
      pathWhitoutId={pathWhitoutId}
      renderCandidates={renderCandidates}
      renderActivities={renderActivities}
    />
  );

  return (
    <div>
      <View component={ProgramProgessComponent} />
    </div>
  );
}

SingleProgram.propTypes = {
  selectedProgram: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
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
  getCandidates: PropTypes.func,
  countActivities: PropTypes.func,
  activitiesByStatus: PropTypes.func,
};

SingleProgram.defaultProps = {
  selectedProgram: {},
  candidates: [],
  getCandidates: () => {},
  countActivities: () => {},
  activitiesByStatus: () => {},
};

function mapStateToProps(state) {
  const { selectedProgram, programs, errors } = state.program;
  const { programStages } = state.stages;
  const { activities } = state.activities;
  const { candidates } = state.candidates;
  const activitiesByStatus = (checkStatus) =>
    filterByStatus(state)(checkStatus);
  const countActivities = (status) => countByStatus(state)(status);
  const candidatesByStatus = (checkStatus) =>
    filterCandidatesByStatus(state)(checkStatus);
  const countCandidates = (status) => countCandidatesByStatus(state)(status);
  return {
    selectedProgram,
    programStages,
    activities,
    programs,
    errors,
    candidates,
    countActivities,
    activitiesByStatus,
    candidatesByStatus,
    countCandidates,
  };
}
function mapDispatchToProps(dispatch) {
  function getProgramStages(id) {
    dispatch(stagesActions.FETCH_PROGRAM_STAGES(id));
  }
  function getProgram(id) {
    dispatch(programActions.GET_PROGRAM(id));
  }
  function getActivities(id) {
    dispatch(activitiesActions.GET_ACTIVITIES(id));
  }
  function getCandidates(programId) {
    dispatch(candidatesActions.GET_CANDIDATES(programId));
  }
  return { getProgramStages, getProgram, getActivities, getCandidates };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProgram);
