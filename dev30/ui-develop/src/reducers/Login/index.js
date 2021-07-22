import actions from 'actions/Login';

const initialState = {
  user: {
    email: '',
  },
  errors: {
    login: {
      code: '',
      message: '',
    },
    changePassword: {
      code: '',
      message: '',
    },
  },
};

/**
 * Signin function to setUp the state, with the action given
 * @param {Object} action action that contains the payload to set in state
 * * @param {Object} action.payload payload that contains the user to set in the state
 * * @param {String} action.payload.email email of the user
 */
function signIn(action) {
  const user = action.payload;
  return {
    ...initialState,
    user,
  };
}

/**
 * Signin function when error is captured, also to setUp in the state
 * @param {Object} state actual state
 * @param {Object} action action that contains the payload to set in state
 * * @param {Object} action.payload payload that contains the error to set in the state
 * * @param {String} action.payload.code staus code of the error given
 * * @param {String} action.payload.message message of the error given
 */
function setErrors(state, action) {
  return {
    ...state,
    errors: {
      ...state.errors,
      ...action.payload,
    },
  };
}

/**
 * Signout function that returns the initial state,
 * that is an empty object with with properties
 */
function signOut() {
  return initialState;
}

/**
 * Login reducer to set the user for the app
 * @param {Object} state state to replace the inital state
 * @param {Object} action action that contains the type
 * * @param {String} action.type type that indicates what action must be execute
 */
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SIGN_IN().type:
      return signIn(action);

    case actions.SET_ERRORS().type:
      return setErrors(state, action);

    case actions.SIGN_OUT().type:
      return signOut();

    default:
      return state;
  }
}
