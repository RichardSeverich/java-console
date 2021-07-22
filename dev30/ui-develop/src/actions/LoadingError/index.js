import {
  START_LOADING,
  SET_ERROR,
  STOP_LOADING,
} from 'app/constant/LoadingError';
import ActionCreater from 'helpers/ActionCreator';

const actionCreator = new ActionCreater('Loading');

export default {
  /**
   * Action to be called when the loading screen is supposed to be showed
   **/
  START_LOADING: () => actionCreator.create(START_LOADING),

  /**
   * Action to change the state to whatever error needs to be showed.
   * @param {Object} payload.error Incoming error information
   * * @param {Number} payload.error.code Numeric code of the error
   * * @param {String} payload.error.message String message of the error
   **/
  SET_ERROR: (payload) => actionCreator.create(SET_ERROR, payload),

  /**
   * Action to be called when the loading screen or error page are not suppoused to be showed
   **/
  STOP_LOADING: () => actionCreator.create(STOP_LOADING),
};
