import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ProgramButtonList from 'components/ProgramButtonList';
import programActions from 'actions/Program';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import stagesActions from 'actions/Stages';
import ImportForm from 'components/ImportForm';
import getFormDataFromId from 'helpers/ImportFile';
import { JSON_TYPE } from 'app/constant/FileType';
import style from './style.module.css';

/**
 * Displays the StageDesign view of the application
 * @param {function} getAllPrograms is a function that get all programs
 * @param {Program[]} programs is a list of programs
 * * @param  {number} Program.id single numeric identifier of a program
 * * @param  {number} Program.programOrder the numeric order of the program
 * * @param  {string} Program.programType the string type name of the program
 * * @param  {string} Program.description a string description of the program
 * @param {function} clearMessages function that clears the error and message
 * @param {function} importStages function that create the file to stages
 * @param {Object} importError contains the message and code
 * when the import of stages is not successful
 * * @param {number} importError.code is the number of the error
 * * @param {string} importError.message is a descriptive message of the error
 * @param  {string} resultSaved that represent to the records accepted
 * @param  {string} resultFailed that represent to the records rejected
 */
function StageDesign({
  getAllPrograms,
  programs,
  clearMessages,
  importStages,
  resultSaved,
  resultFailed,
  importError,
}) {
  const { path } = useRouteMatch();
  const uploadStagesId = 'uploadStages';

  function handleImport() {
    const data = getFormDataFromId(uploadStagesId);
    if (data) {
      importStages(data);
    }
  }

  useEffect(() => {
    getAllPrograms();
    return () => {
      clearMessages();
    };
  }, [getAllPrograms, clearMessages]);

  return (
    <div className={style.container}>
      <ProgramButtonList programs={programs} path={path} />
      <div>
        <h3>Import Stages</h3>
        <ImportForm
          id={uploadStagesId}
          typeFile={JSON_TYPE}
          handleImport={handleImport}
          resultSaved={resultSaved}
          resultRejected={resultFailed}
          errorMessage={importError.message}
        />
      </div>
    </div>
  );
}

StageDesign.propTypes = {
  getAllPrograms: PropTypes.func,
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      programOrder: PropTypes.number,
      programType: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  clearMessages: PropTypes.func,
  importStages: PropTypes.func,
  importError: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string,
  }),
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
};

StageDesign.defaultProps = {
  getAllPrograms: () => {},
  programs: [],
  clearMessages: () => {},
  importStages: () => {},
  importError: {},
  resultSaved: '',
  resultFailed: '',
};

function mapStateToProps(state) {
  const { programs } = state.program;
  const resultSaved = state.stages.importResult.saved.toString();
  const resultFailed = state.stages.importResult.failed.toString();
  const importError = state.stages.errors.importJSON;
  return { programs, resultSaved, resultFailed, importError };
}

function mapDispatchToProps(dispatch) {
  function getAllPrograms() {
    dispatch(programActions.FETCH_PROGRAMS());
  }
  function clearMessages() {
    dispatch(stagesActions.CLEAR_MESSAGES());
  }
  function importStages(file) {
    dispatch(stagesActions.IMPORT_STAGES(file));
  }
  return { getAllPrograms, clearMessages, importStages };
}
export default connect(mapStateToProps, mapDispatchToProps)(StageDesign);
