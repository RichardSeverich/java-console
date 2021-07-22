import {
  SET_ERRORS,
  SET_UPLOADED_ACTIVITIES,
  UPLOAD_ACTIVITIES,
  GET_ACTIVITIES,
  SET_ACTIVITIES,
  CLEAR_MESSAGES,
} from 'app/constant/Activities';

import ActionCreator from 'helpers/ActionCreator';

const actionCreator = new ActionCreator('Activities');

export default {
  /**
   * Action creator to UPLOAD_ACTIVITIES to the api
   * @param {Object} payload payload that contains the file
   */
  UPLOAD_ACTIVITIES: (payload) =>
    actionCreator.create(UPLOAD_ACTIVITIES, payload),

  /**
   * Action cretor to set the result of the UPLOAD_ACTIVITIES
   * action into the reducer after this was successfully
   * @param {Object} payload contains the response of the request
   */
  SET_UPLOADED_ACTIVITIES: (payload) =>
    actionCreator.create(SET_UPLOADED_ACTIVITIES, payload),

  /**
   * Action creator to set the result of the UPLOAD_ACTIVITIES
   * action into the reducer after this was fail
   * @param {Object} payload contains the errors object after
   * requests failed
   */
  SET_ERRORS: (payload) => actionCreator.create(SET_ERRORS, payload),

  /**
   * Action creator to get the activities from api
   * @param {Object} payload.activities contains the activities to set to the store
   */
  GET_ACTIVITIES: (payload) => actionCreator.create(GET_ACTIVITIES, payload),

  /**
   * Action creator to set the activities from api
   * @param {Object} payload.activities contains the activities to set to the store
   */
  SET_ACTIVITIES: (payload) => actionCreator.create(SET_ACTIVITIES, payload),

  /**
   * Action creator to CLEAR_MESSAGES to the reducer, this action will called when
   * container import activities is dismount.
   */
  CLEAR_MESSAGES: () => actionCreator.create(CLEAR_MESSAGES),
};
