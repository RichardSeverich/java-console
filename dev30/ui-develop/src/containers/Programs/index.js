import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import programActions from 'actions/Program';

import ProgramsRouterComponent from 'app/components/ProgramsRouter';

/**
 * Displays the ProgramProgress view of the application
 * @param {object} getPrograms function that get the list of programs.
 * @param {function} clearPrograms function that clears state of programs
 */
function Programs({ getPrograms, clearPrograms }) {
  useEffect(() => {
    getPrograms();
    return () => {
      clearPrograms();
    };
  }, [clearPrograms, getPrograms]);

  return <ProgramsRouterComponent />;
}

Programs.propTypes = {
  getPrograms: PropTypes.func,
  clearPrograms: PropTypes.func,
};

Programs.defaultProps = {
  getPrograms: () => {},
  clearPrograms: () => {},
};

function mapStateToProps(state) {
  const { programs } = state.program;
  const { selectedProgram } = state.program;
  return { programs, selectedProgram };
}
function mapDispatchToProps(dispatch) {
  function getPrograms() {
    dispatch(programActions.FETCH_PROGRAMS());
  }
  function clearPrograms() {
    dispatch(programActions.CLEAR_PROGRAMS());
  }

  return {
    getPrograms,
    clearPrograms,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Programs);
