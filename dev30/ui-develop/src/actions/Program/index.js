import {
  FETCH_PROGRAMS,
  SET_PROGRAMS,
  CLEAR_PROGRAMS,
  IMPORT_PROGRAMS,
  SET_IMPORT_PROGRAMS,
  SET_ERRORS,
  GET_PROGRAM,
  SET_PROGRAM,
  CLEAR_PROGRAM,
  CLEAR_MESSAGES,
  UPDATE_PROGRAM,
  SET_PROGRAM_TO_EDIT,
} from 'app/constant/Program';
import ActionCreater from 'helpers/ActionCreator';

const actionCreator = new ActionCreater('Program');

export default {
  /**
   * Action creator to FETCH_PROGRAMS from api
   */
  FETCH_PROGRAMS: () => actionCreator.create(FETCH_PROGRAMS),

  /**
   * Action creator to SET_PROGRAMS to the reducer
   * @param {Object} payload payload that contains the programs to set to the store
   * * @param {Object} payload.programs programs to set to the store
   */
  SET_PROGRAMS: (payload) => actionCreator.create(SET_PROGRAMS, payload),

  /**
   * Action creator to CLEAR_PROGRAMS of the store
   */
  CLEAR_PROGRAMS: () => actionCreator.create(CLEAR_PROGRAMS),

  /**
   * Action creator to IMPORT_PROGRAMS to the api
   * @param {Object} payload payload that contains the form data to send to the api
   */
  IMPORT_PROGRAMS: (payload) => actionCreator.create(IMPORT_PROGRAMS, payload),

  /**
   * Action creator to SET_IMPORT_PROGRAMS to the reducer, this action will called
   * only if the IMPORT_PROGRAMS action was executed successfully
   * @param {payload} payload payload that contains the csv file
   */
  SET_IMPORT_PROGRAMS: (payload) =>
    actionCreator.create(SET_IMPORT_PROGRAMS, payload),

  /**
   * Action creator to GET_PROGRAM to the reducer, this action will called
   * @param {payload} payload payload that contains the id program
   */
  GET_PROGRAM: (payload) => actionCreator.create(GET_PROGRAM, payload),

  /**
   * Action creator to SET_PROGRAM to the reducer, this action will called
   * only if the GET_PROGRAM action was executed successfully
   * @param {payload} payload payload that contains a program name
   */
  SET_PROGRAM: (payload) => actionCreator.create(SET_PROGRAM, payload),

  /**
   * Action creator to SET_ERRORS to the reducer, this action will called only when any
   * results of actions called gives errors
   * * @param {Object} payload payload that contains the error to set to the store
   * * @param {Object} payload.getAll error when getAll was catched
   * * @param {Object} payload.getAll.code status code of the error
   * * @param {Object} payload.getAll.message message of the error
   */
  SET_ERRORS: (payload) => actionCreator.create(SET_ERRORS, payload),

  /**
   * Action creator to CLEAR_PROGRAM to the reducer, this action will called when
   * container program is dismount.
   */
  CLEAR_PROGRAM: () => actionCreator.create(CLEAR_PROGRAM),

  /**
   * Action creator to CLEAR_MESSAGES to the reducer, this action will called when
   * container import program is dismount.
   */
  CLEAR_MESSAGES: () => actionCreator.create(CLEAR_MESSAGES),

  /**
   * Action creator to UPDATE_PROGRAM to the reducer, this action will called when update
   * save changes button is pressed
   *
   * @param {Object} payload contains the values of a program updated
   * * @param {string} payload.startDate is the start date of a program
   * * @param {string} payload.endDate is the end of date of a program
   * * @param {string} payload.description is the description of a program
   */
  UPDATE_PROGRAM: (payload) => actionCreator.create(UPDATE_PROGRAM, payload),

  /**
   * Action creator to SET_PROGRAM_TO_EDIT to the reducer, this action will be called when editing
   * a program
   */
  SET_PROGRAM_TO_EDIT: (payload) =>
    actionCreator.create(SET_PROGRAM_TO_EDIT, payload),
};
