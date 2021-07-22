import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProgramButtonList from 'components/ProgramButtonList';
import ProgramStages from 'components/ProgramStages';
import PropTypes from 'prop-types';
import ImportForm from 'components/ImportForm';
import stagesActions from 'actions/Stages';
import programActions from 'actions/Program';
import { useParams, useRouteMatch } from 'react-router-dom';
import SingleStageDesignComponent from 'app/components/SingleStageDesign';
import getFormDataFromId from 'helpers/ImportFile';
import { JSON_TYPE } from 'app/constant/FileType';

/**
 * Displays the SingleStageDesign view of the application
 * @param {object} selectedProgram is a selected program
 * * @param {number} selectedProgram.id numeric identifier of the program
 * * @param {string} selectedProgram.name the string name of the program
 * * @param {string} selectedProgram.startDate the start date of the program
 * * @param {string} selectedProgram.endDate the end date of the program
 * @param {function} getProgramStages function that get stages of a program
 * @param {Stage[]} programStages is a list of stages of a program
 * * @param {number} Stage.id is a identifier of a stage
 * * @param {string} Stage.name is the name of a stage
 * * @param {string} Stage.startDate is the start date of a stage
 * @param {function} getProgram function that get a program by id
 * @param {Program[]} programs is a list of programs
 * * @param  {number} Program.id single numeric identifier of a program
 * * @param  {number} Program.programOrder the numeric order of the program
 * * @param  {string} Program.programType the string type name of the program
 * * @param  {string} Program.description a string description of the program
 * @param {function} updateStages function that update the stages of a program
 * @param {Object} updateStagesError contains the message and code
 * when the update of stages is not successful
 * * @param {number} updateStagesError.code is the number of the error
 * * @param {string} updateStagesError.message is a descriptive message of the error
 * @param {function} clearMessages function that clears the error and message
 * @param {function} importStages function that create the file to stages
 * @param {Object} importError contains the message and code
 * when the import of stages is not successful
 * * @param {number} importError.code is the number of the error
 * * @param {string} importError.message is a descriptive message of the error
 * @param  {string} resultSaved that represent to the records accepted
 * @param  {string} resultFailed that represent to the records rejected
 * @param  {function} updateStage function to update a stage of the programStages of the store
 */
function SingleStageDesign({
  selectedProgram,
  getProgramStages,
  programStages,
  getProgram,
  programs,
  updateStages,
  updateStagesError,
  clearMessages,
  importStages,
  importError,
  resultSaved,
  resultFailed,
  updateStage,
}) {
  const uploadStagesId = 'uploadStages';
  const { url } = useRouteMatch();
  const { id } = useParams();

  const pathWithoutId = url.slice(0, url.lastIndexOf('/'));

  function handleImport() {
    const data = getFormDataFromId(uploadStagesId);
    if (data) {
      importStages(data);
    }
  }

  useEffect(() => {
    getProgramStages(id);
  }, [getProgramStages, id, resultFailed, resultSaved]);

  useEffect(() => {
    getProgram(id);
    return () => {
      clearMessages();
    };
  }, [getProgram, id, clearMessages]);

  return (
    <SingleStageDesignComponent>
      <ProgramButtonList
        programs={programs}
        path={pathWithoutId}
        selectedProgram={selectedProgram}
      />
      <div>
        <ProgramStages
          selectedProgram={selectedProgram}
          programStages={programStages}
          updateStages={updateStages}
          updateStagesError={updateStagesError}
          updateStage={updateStage}
        />
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
    </SingleStageDesignComponent>
  );
}

SingleStageDesign.propTypes = {
  selectedProgram: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  getProgramStages: PropTypes.func,
  programStages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  getProgram: PropTypes.func,
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      programOrder: PropTypes.number,
      programType: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  updateStages: PropTypes.func,
  updateStagesError: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string,
  }),
  clearMessages: PropTypes.func,
  importStages: PropTypes.func,
  importError: PropTypes.shape({
    code: PropTypes.number,
    message: PropTypes.string,
  }),
  resultSaved: PropTypes.string,
  resultFailed: PropTypes.string,
};

SingleStageDesign.defaultProps = {
  selectedProgram: {},
  getProgramStages: () => {},
  programStages: [],
  getProgram: () => {},
  programs: [],
  updateStages: () => {},
  updateStagesError: {},
  clearMessages: () => {},
  importStages: () => {},
  importError: {},
  resultSaved: '',
  resultFailed: '',
};

function mapStateToProps(state) {
  const { selectedProgram, programs } = state.program;
  const { programStages } = state.stages;
  const updateStagesError = state.stages.errors.updateProgramStages;
  const importError = state.stages.errors.importJSON;
  const resultSaved = state.stages.importResult.saved.toString();
  const resultFailed = state.stages.importResult.failed.toString();
  return {
    selectedProgram,
    programStages,
    programs,
    updateStagesError,
    importError,
    resultSaved,
    resultFailed,
  };
}
function mapDispatchToProps(dispatch) {
  function getProgramStages(id) {
    dispatch(stagesActions.FETCH_PROGRAM_STAGES(id));
  }
  function getProgram(id) {
    dispatch(programActions.GET_PROGRAM(id));
  }
  function updateStages(stages) {
    dispatch(stagesActions.UPDATE_PROGRAM_STAGES(stages));
  }
  function clearMessages() {
    dispatch(stagesActions.CLEAR_MESSAGES());
  }
  function importStages(file) {
    dispatch(stagesActions.IMPORT_STAGES(file));
  }
  function updateStage(stage) {
    dispatch(stagesActions.UPDATE_STAGE(stage));
  }
  return {
    getProgramStages,
    getProgram,
    updateStages,
    clearMessages,
    importStages,
    updateStage,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleStageDesign);
