import actions from 'actions/Login';
import api from 'api/Login';
import AuthService from 'app/services/AuthService';
import CookiesService from 'app/services/CookieService';

/**
 * Function Login user that calls the axios login function
 * @param {Object} action action that handle the payload of the request
 * * @param {Object} action.payload payload that contains the token of the request
 * @param {Function} dispatch action that dispatch the corresponding action creator
 * depending the response of the login function
 */
async function loginUser(action, dispatch) {
  try {
    const response = await api.login(action.payload);
    CookiesService.saveCookie('token', response.token);
    const decodedToken = AuthService.decodeToken(response.token);
    const user = {
      email: decodedToken.sub,
    };
    dispatch(actions.SIGN_IN(user));
    dispatch(actions.SET_ERRORS({ login: { code: '', message: '' } }));
  } catch (error) {
    const errorSignIn = {
      code: error.code,
      message: error.message,
    };
    CookiesService.saveCookie('temporal_token', error.token);
    dispatch(actions.SET_ERRORS({ login: errorSignIn }));
  }
}
/**
 * Function logout user, removes a user from the state and cookies
 * @param {Function} dispatch action that dispatch the corresponding action creator
 */
function logoutUser(dispatch) {
  CookiesService.removeCookie('token');
  dispatch(actions.SIGN_OUT());
}

/**
 * Function isLogin attempts to relog a user based on a cookie
 * if it fails the cookie gets deleted
 * @param {Function} dispatch action that dispatch the corresponding action creator
 */
function isLogin(dispatch) {
  try {
    const cookie = CookiesService.getCookie('token');
    const decoded = AuthService.decodeToken(cookie);
    const user = {
      email: decoded.sub,
    };
    dispatch(actions.SIGN_IN(user));
  } catch (error) {
    CookiesService.removeCookie('token');
  }
}

/**
 * Function Login user that calls the axios login function
 * @param {Object} action action that handle the payload of the request
 * * @param {Object} action.payload payload that contains the token of the request
 * @param {Function} dispatch action that dispatch the corresponding action creator
 * depending the response of the login function
 */
async function changePassword(action, dispatch) {
  try {
    const temporalToken = CookiesService.getCookie('temporal_token');
    await api.changePassword(action.payload, temporalToken);
    CookiesService.removeCookie('temporal_token');
    dispatch(actions.SET_ERRORS({ changePassword: { code: '', message: '' } }));
  } catch (errorChangePassword) {
    dispatch(actions.SET_ERRORS({ changePassword: errorChangePassword }));
  }
}

/**
 * Login middleware function that intercept the request from the container
 * to the API
 * @param {Object} store store of the login middleware
 */
export default function loginMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.LOGIN().type:
        await loginUser(action, dispatch);
        break;

      case actions.LOGOUT().type:
        logoutUser(dispatch);
        break;

      case actions.ISLOGIN().type:
        isLogin(dispatch);
        break;

      case actions.CHANGE_PASSWORD().type:
        await changePassword(action, dispatch);
        break;

      default:
        next(action);
        break;
    }
  };
}
