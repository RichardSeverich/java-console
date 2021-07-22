import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import programActions from 'actions/Program';
import { useRouteMatch, useParams } from 'react-router-dom';
import SingleProgramDesign from 'app/components/SingleProgramDesign';
import { CSV_TYPE } from 'app/constant/FileType';
import getFormDataFromId from 'helpers/ImportFile';

/**
 * Displays the ProgramProgress view of the application
 * @param {object} selectedProgram is a selected program.
 * @param {number} selectedProgram.id numeric identifier of the program
 * @param {string} selectedProgram.name the string name of the program
 * @param {array} programs is a list of programs.
 * @param {Function} clearImportMessages function that clears the error and import messages
 * @param {Function} importPrograms function that create the file to programs
 * @param {Function} resultSaved number that represent the number of records accepted
 * @param {Function} resuldFailed number that represent the number of records rejected
 * @param {Function} errorImport object that represent the import error
 * @param {function} updateProgram function  that update the details of a program
 * @param {function} setPogramToEdit function  that set the details of a program
 */
function SingleProgram({
  selectedProgram,
  getProgram,
  programs,
  clearImportMessages,
  importPrograms,
  resultSaved,
  resultFailed,
  errorImport,
  updateProgram,
  setProgramToEdit,
}) {
  const ID = 'uploadPrograms';
  function handleImport() {
    const data = getFormDataFromId(ID);
    if (data) {
      importPrograms(data);
    }
  }

  const { url } = useRouteMatch();
  const { id } = useParams();

  const pathWhitoutId = url.slice(0, url.lastIndexOf('/'));

  useEffect(() => {
    getProgram(id);
    return () => {
      clearImportMessages();
    };
  }, [getProgram, id, clearImportMessages]);

  return (
    <div>
      <SingleProgramDesign
        selectedProgram={selectedProgram}
        programs={programs}
        pathWhitoutId={pathWhitoutId}
        id={ID}
        typeFile={CSV_TYPE}
        handleImport={handleImport}
        resultSaved={resultSaved}
        resultRejected={resultFailed}
        errorMessage={errorImport.message}
        updateProgram={updateProgram}
        setProgramToEdit={setProgramToEdit}
      />
    </div>
  );
}

SingleProgram.propTypes = {
  selectedProgram: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  getProgram: PropTypes.func,
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      programOrder: PropTypes.number,
      programType: PropTypes.string,
      description: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  clearImportMessages: PropTypes.func,
  importPrograms: PropTypes.func,
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
  errorImport: PropTypes.shape({}),
  updateProgram: PropTypes.func,
};

SingleProgram.defaultProps = {
  selectedProgram: {},
  getProgram: () => {},
  programs: [],
  clearImportMessages: () => {},
  importPrograms: () => {},
  resultSaved: '',
  resultFailed: '',
  errorImport: {},
  updateProgram: () => {},
};

function mapStateToProps(state) {
  const { selectedProgram, programs, errors } = state.program;
  const resultSaved = state.program.importResult.saved.toString();
  const resultFailed = state.program.importResult.failed.toString();
  const errorImport = state.program.errors.importCSV;
  return {
    selectedProgram,
    programs,
    errors,
    resultSaved,
    resultFailed,
    errorImport,
  };
}
function mapDispatchToProps(dispatch) {
  function getProgram(id) {
    dispatch(programActions.GET_PROGRAM(id));
  }
  function importPrograms(file) {
    dispatch(programActions.IMPORT_PROGRAMS(file));
  }
  function clearImportMessages() {
    dispatch(programActions.CLEAR_MESSAGES());
  }
  function updateProgram(program) {
    dispatch(programActions.UPDATE_PROGRAM(program));
  }
  function setProgramToEdit(program) {
    dispatch(programActions.SET_PROGRAM_TO_EDIT(program));
  }
  return {
    getProgram,
    importPrograms,
    clearImportMessages,
    updateProgram,
    setProgramToEdit,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProgram);
