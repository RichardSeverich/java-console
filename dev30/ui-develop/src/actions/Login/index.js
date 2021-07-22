import {
  LOGIN,
  SIGN_IN,
  LOGOUT,
  SIGN_OUT,
  SET_ERRORS,
  ISLOGIN,
  CHANGE_PASSWORD,
} from 'app/constant/Login';
import ActionCreater from 'helpers/ActionCreator';

const actionCreator = new ActionCreater('Auth');

export default {
  /**
   * LOGIN action creator to communicats with the api
   * @param {Object} payload user payload to login to be passed
   * * @param {String} payload.email email of the user to be login
   * * @param {String} payload.password password of the user to be login
   */
  LOGIN: (payload) => actionCreator.create(LOGIN, payload),

  /**
   * LOGOUT action creator to communicats with reducer
   */
  LOGOUT: () => actionCreator.create(LOGOUT),

  /**
   * ISLOGIN action creator to communicats with reducer
   */
  ISLOGIN: () => actionCreator.create(ISLOGIN),

  /**
   * SIGN_IN action creator to communicats with reducer
   * @param {Object} payload user payload to signin in the reducer
   * * @param {String} payload.email email of the user to be signin
   */
  SIGN_IN: (payload) => actionCreator.create(SIGN_IN, payload),

  /**
   * SIGN_OUT action creator to communicats with reducer
   */
  SIGN_OUT: () => actionCreator.create(SIGN_OUT),

  /**
   * SET_ERRORS action creator to communicats with the reducer
   * @param {Object} payload error payload to be bassed to the reducer
   * * @param {String} payload.code status code of the error
   * * @param {String} payload.message message of the error
   */
  SET_ERRORS: (payload) => actionCreator.create(SET_ERRORS, payload),

  /**
   * CHANGE_PASSWORD action creator to communicates with the api
   * @param {Object} payload creator to change password
   * * @param {String} payload.email user email
   * * @param {String} payload.currentPassword old user password
   * * @param {String} payload.newPassword new user password
   * * @param {String} payload.confirmPassword confirm user password
   */
  CHANGE_PASSWORD: (payload) => actionCreator.create(CHANGE_PASSWORD, payload),
};
