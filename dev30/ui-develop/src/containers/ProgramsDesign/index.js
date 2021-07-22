import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import programActions from 'actions/Program';
import { useRouteMatch } from 'react-router-dom';
import ProgramDesignComponent from 'app/components/ProgramsDesign';
/**
 * Displays the main import form view of the application
 * @param  {} clearImportMessages function that clears the error and import messages
 * @param  {} importPrograms function that create the file to programs
 * @param  {} resultSaved number that represent the number of records accepted
 * @param  {} resuldFailed number that represent the number of records rejected
 * @param  {} errorImport object that represent the import error
 */
function ProgramDesign({
  clearImportMessages,
  importPrograms,
  resultSaved,
  resultFailed,
  errorImport,
  programs,
  getAllPrograms,
}) {
  const { path } = useRouteMatch();

  const typeFile =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
  function isInputFileEmpty(file) {
    return file.files.length > 0;
  }
  const ID = 'uploadPrograms';
  function handleImport() {
    const csvFile = document.querySelector(`#${ID}`);
    if (isInputFileEmpty(csvFile)) {
      const data = new FormData();
      const [file] = csvFile.files;
      data.append('file', file);
      importPrograms(data);
    }
  }

  useEffect(() => {
    getAllPrograms();
    return () => {
      clearImportMessages();
    };
  }, [clearImportMessages, getAllPrograms]);

  return (
    <div>
      <ProgramDesignComponent
        programs={programs}
        path={path}
        id={ID}
        typeFile={typeFile}
        handleImport={handleImport}
        resultSaved={resultSaved}
        resultRejected={resultFailed}
        errorMessage={errorImport.message}
      />
    </div>
  );
}

ProgramDesign.propTypes = {
  clearImportMessages: PropTypes.func,
  importPrograms: PropTypes.func,
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
  errorImport: PropTypes.shape({}),
};

ProgramDesign.defaultProps = {
  clearImportMessages: () => {},
  importPrograms: () => {},
  resultSaved: '',
  resultFailed: '',
  errorImport: {},
};

function mapStateToProps(state) {
  const resultSaved = state.program.importResult.saved.toString();
  const resultFailed = state.program.importResult.failed.toString();
  const errorImport = state.program.errors.importCSV;
  const { programs } = state.program;
  return { resultSaved, resultFailed, errorImport, programs };
}
function mapDispatchToProps(dispatch) {
  function importPrograms(file) {
    dispatch(programActions.IMPORT_PROGRAMS(file));
  }

  function clearImportMessages() {
    dispatch(programActions.CLEAR_MESSAGES());
  }

  function getAllPrograms() {
    dispatch(programActions.FETCH_PROGRAMS());
  }

  return { importPrograms, clearImportMessages, getAllPrograms };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProgramDesign);
