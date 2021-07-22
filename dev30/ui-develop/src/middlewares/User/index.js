import { CREATED_USER_FILE, SET_RESPONSE_USER, ERROR_USER } from 'actions/User';
import { User } from 'api';
/**
 * Function postCreateUser user that calls the axios user function createUserFileCSV
 * @param {Object} action action that handle the payload of the request
 * * @param {Object} action.payload payload that contains the file of the request
 * @param {Function} dispatch action that dispatch the corresponding action creator
 * depending the response of the createUserFileCSV function
 */

async function postCreateUser(action, dispatch) {
  try {
    const result = await User.createUserFileCSV(action.payload);
    dispatch(SET_RESPONSE_USER(result));
  } catch (error) {
    dispatch(ERROR_USER(error));
  }
}

/**
 * User middleware function that intercept the request from the container
 * to the API
 * @param {Object} store store of the User middleware
 */
function userMiddleware(store, state) {
  const { dispatch } = store;
  return (next) => (action) => {
    switch (action.type) {
      case CREATED_USER_FILE().type:
        postCreateUser(action, dispatch);
        next(action);
        break;
      default:
        next(action);
    }
  };
}

export default userMiddleware;
