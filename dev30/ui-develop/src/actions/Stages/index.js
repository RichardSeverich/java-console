import {
  IMPORT_STAGES,
  IMPORT_STAGES_SUCCESS,
  SET_STAGES_ERROR,
  SET_SELECTED_PROGRAM_STAGES,
  FETCH_PROGRAM_STAGES,
  CLEAR_MESSAGES,
  UPDATE_PROGRAM_STATES,
  UPDATE_STAGE,
} from 'app/constant/Stages';
import ActionCreater from 'helpers/ActionCreator';

const actionCreator = new ActionCreater('Stages');

export default {
  /**
   *Action creator to IMPORT_STAGES to the API
   *@param {Object} payload payload that contains the formdata to send to the api
   */
  IMPORT_STAGES: (payload) => actionCreator.create(IMPORT_STAGES, payload),

  /**
   * Action creator to IMPORT_STAGES_SUCCESS to the reducer, this acction will called
   * only if the IMPORT_STAGES action was executed successfully
   * @param {payload} payload payload that contains the json file
   */
  IMPORT_STAGES_SUCCESS: (payload) =>
    actionCreator.create(IMPORT_STAGES_SUCCESS, payload),

  /**
   * Action creator to SET_STAGES_ERROR to the reducer
   * @param {Object} payload payload that contains the error to set to the store
   * @param {Object} payload.error error to set to the store
   * @param {Object} payload.error.code status code of the error
   * @param {Object} payload.error.message message of the error
   */
  SET_STAGES_ERROR: (payload) =>
    actionCreator.create(SET_STAGES_ERROR, payload),

  /**
   * Action creator for SET_SELECTED_PROGRAM_STAGES to the reducer, this action will be called
   * when selecting a program
   * @param {Object} payload contains all data for retrieved program stages
   * @param {Object} payload.stages contains the list of stages belong to a program
   */
  SET_SELECTED_PROGRAM_STAGES: (payload) =>
    actionCreator.create(SET_SELECTED_PROGRAM_STAGES, payload),

  /**
   * Action creator for FETCH_PROGRAM_STAGES to the reducer, this action will be called when
   * selecting a program
   * @param {Object} payload contains all data for retrieving program stages
   * @param {Object} payload.programId is the id for retrieving program's stages
   */
  FETCH_PROGRAM_STAGES: (payload) =>
    actionCreator.create(FETCH_PROGRAM_STAGES, payload),

  /**
   * Action creator to CLEAR_MESSAGES to the reducer, this action will called when
   * container import stages is dismount.
   */
  CLEAR_MESSAGES: () => actionCreator.create(CLEAR_MESSAGES),

  /**
   * Action creator to UPDATE_PROGRAM_STAGES to the API, this action will be called
   * when there are changes in the stages.
   *
   * @param {Object} payload contains the id of the program and stages list of the program
   * * @param {number} payload.programId is the identifier of the program
   * * @param {ProgramStage[]} stages are the updated stages of a program.
   * * * @param {number} ProgramStage.id is the identifier of the stage
   * * * @param {string} ProgramStage.name is the name of the stage
   * * * @param {number} ProgramStage.order is a unique number of the stage
   * * * @param {number} ProgramStage.startDate is a unique date of the stage
   */
  UPDATE_PROGRAM_STAGES: (payload) =>
    actionCreator.create(UPDATE_PROGRAM_STATES, payload),

  /**
   * Action creator to UPDATE_STAGE to the Store, this action will be called
   * to update a stage of the stages list of the store.
   *
   * @param {Object} payload contains the values of a stage updated
   * * @param {number} payload.id is the identify of the stage
   * * @param {number} payload.order is the order of the stage
   * * @param {string} payload.name is the name of the stage
   * * @param {string} payload.startDate is the start date of the stage
   */
  UPDATE_STAGE: (payload) => actionCreator.create(UPDATE_STAGE, payload),
};
