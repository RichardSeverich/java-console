import {
  CREATED,
  SET_RESPONSE,
  ERROR,
  CLEAR_MESSAGES_USER,
} from 'app/constant/User';
import ActionCreater from 'helpers/ActionCreator';

const actionCreator = new ActionCreater('User');
/**
 * Action creator to CREATED_USER_FILE from api
 * * @param {Object} payload payload that contains the FILE CSV to set to API
 */

/**
 * Action creator to SET_RESPONSE_USER from api
 * * @param {Object} payload.response payload that contains the response message to set to API
 */

const CREATED_USER_FILE = (payload) => actionCreator.create(CREATED, payload);

const SET_RESPONSE_USER = (payload) =>
  actionCreator.create(SET_RESPONSE, payload);

const ERROR_USER = (payload) => actionCreator.create(ERROR, payload);

const CLEAR_MESSAGES = () => actionCreator.create(CLEAR_MESSAGES_USER);

export { CREATED_USER_FILE, SET_RESPONSE_USER, ERROR_USER, CLEAR_MESSAGES };
