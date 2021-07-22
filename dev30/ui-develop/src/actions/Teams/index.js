import ActionCreator from 'app/helpers/ActionCreator/index';
import {
  IMPORT_TEAMS,
  SET_IMPORT_TEAMS,
  SET_ERRORS,
  CLEAR_MESSAGES,
} from 'app/constant/Teams';

const actionCreator = new ActionCreator('Teams');

export default {
  /**
   * Action creator to IMPORT_TEAMS to the api
   * @param {Object} payload payload that contains the form data to send to the api
   */
  IMPORT_TEAMS: (payload) => actionCreator.create(IMPORT_TEAMS, payload),

  /**
   * Action creator to SET_IMPORT_TEAMS to the reducer, this action will called
   * only if the IMPORT_TEAMS action was executed successfully
   * @param {payload} payload payload that contains the file
   */
  SET_IMPORT_TEAMS: (payload) =>
    actionCreator.create(SET_IMPORT_TEAMS, payload),

  /**
   * Action creator to SET_ERRORS to the reducer, this action will called only when any
   * results of actions called gives errors
   * * @param {Object} payload payload that contains the error to set to the store
   * * @param {Object} payload.getAll.code status code of the error
   * * @param {Object} payload.getAll.message message of the error
   */
  SET_ERRORS: (payload) => actionCreator.create(SET_ERRORS, payload),

  /**
   * Action creator to CLEAR_MESSAGES to the reducer, this action will called when
   * container import Teams is dismount.
   */
  CLEAR_MESSAGES: () => actionCreator.create(CLEAR_MESSAGES),
};
