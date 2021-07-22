import { SET_RESPONSE_USER, ERROR_USER, CLEAR_MESSAGES } from 'actions/User';

const initialState = {
  userCreateFile: {
    message: '',
    total: '',
    saved: '',
    failed: '',
  },
  error: {
    code: '',
    message: '',
  },
};

/**
 * SET_RESPONSE_USER function to set the user to the state
 * @param {Object} action action that contains the array
 * of user
 * * @param {Array} action.payload payload array of user response
 */

function setUser(action) {
  const userCreateFile = action.payload;
  return {
    ...initialState,
    userCreateFile,
  };
}
/**
 * User manage  errors function when error is captured, also to setUp in the state
 * @param {Object} action action that contains the payload to set in state
 * * @param {Object} action.payload payload that contains the error to set in the state
 * * @param {String} action.payload.code staus code of the error given
 * * @param {String} action.payload.message message of the error given
 */

function userError(action) {
  const error = action.payload;
  return {
    ...initialState,
    error,
  };
}

/**
 * ClearMessages function that sets the initial state empty in error and import messages
 * @param {Object} state state actual
 */
function clearMessages(state) {
  const error = { code: '', message: '' };
  const userCreateFile = { message: '', total: '', saved: '', failed: '' };
  return {
    ...state,
    error,
    userCreateFile,
  };
}

/**
 * User reducer to set the user for the app
 * @param {Object} state state to replace the inital state
 * @param {Object} action action that contains the action given
 * * @param {Object} action.type type of the action that indicates what action will be executed
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESPONSE_USER().type:
      return setUser(action);
    case ERROR_USER().type:
      return userError(action);
    case CLEAR_MESSAGES().type: {
      return clearMessages(state);
    }
    default:
      return state;
  }
}
