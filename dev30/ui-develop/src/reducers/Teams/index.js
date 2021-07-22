import actions from 'actions/Teams';

const initialState = {
  errors: {
    import: {
      code: '',
      message: '',
    },
  },
  importResult: {
    message: '',
    total: '',
    saved: '',
    failed: '',
  },
};

/**
 * SetImportTeams function that sets the response of the
 * importTeams function in the state
 * @param {Object} state state actual
 * @param {Object} action action which contains the payload to store
 */
function setImportTeams(state, action) {
  const importResult = action.payload;
  return {
    ...state,
    importResult,
  };
}

/**
 * SetTeamsErrors function to set the errors to the state
 * @param {Object} state actual state
 * @param {Object} action action contains the errors
 * * @param {Object} action.payload payload contains the specific error,
 * * could be import error, the error that is captured
 * * will be set in the store
 */
function setTeamsErrors(state, action) {
  return {
    ...state,
    errors: {
      ...state.errors,
      ...action.payload,
    },
  };
}

/**
 * ClearMessages function that sets the initial state empty in error and import messages
 * @param {Object} state state actual
 */
function clearMessages(state) {
  const errors = {
    import: {
      code: '',
      message: '',
    },
  };

  const importResult = { message: '', total: '', saved: '', failed: '' };
  return {
    ...state,
    errors,
    importResult,
  };
}

/**
 * Teams reducer to set the teams for the app
 * @param {Object} state state to replace the inital state
 * @param {Object} action action that contains the action given
 * * @param {Object} action.type type of the action that indicates what action will be executed
 */
export default function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_IMPORT_TEAMS().type: {
      return setImportTeams(state, action);
    }
    case actions.SET_ERRORS().type: {
      return setTeamsErrors(state, action);
    }

    case actions.CLEAR_MESSAGES().type: {
      return clearMessages(state);
    }

    default:
      return state;
  }
}
