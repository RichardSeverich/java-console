import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import programActions from 'actions/Program';
import ProgramButtonList from 'app/components/ProgramButtonList';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { getFirstProgram } from 'app/selectors/Programs';

/**
 * Displays the ProgramProgress view of the application
 * @param {function} getAllPrograms is a function that get all programs
 * @param {array} programs is a list of programs get after actions FETCH_PROGRAMS
 * @param {number} getIdProgram get first id program of list programs
 */
function ProgramProgress({ getAllPrograms, programs, getIdProgram }) {
  const { path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    getAllPrograms();
    if (getIdProgram) {
      history.push(`${path}/${getIdProgram}`);
    }
  }, [getAllPrograms, history, path, getIdProgram]);

  return (
    <div>
      <ProgramButtonList programs={programs} path={path} />
    </div>
  );
}

ProgramProgress.propTypes = {
  getAllPrograms: PropTypes.func,
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      programOrder: PropTypes.number,
      programType: PropTypes.string,
      description: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  getIdProgram: PropTypes.number,
};

ProgramProgress.defaultProps = {
  getAllPrograms: () => {},
  programs: [],
  getIdProgram: 0,
};

function mapStateToProps(state) {
  const { programs } = state.program;
  const getIdProgram = getFirstProgram(state);
  return { programs, getIdProgram };
}

function mapDispatchToProps(dispatch) {
  function getAllPrograms() {
    dispatch(programActions.FETCH_PROGRAMS());
  }
  return { getAllPrograms };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProgramProgress);
