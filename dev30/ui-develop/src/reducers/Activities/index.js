import actions from 'actions/Activities/index';

const initialState = {
  activities: [],
  errors: {
    uploadActivities: {
      code: '',
      message: '',
    },
    getActivities: {
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
 * Set result of the upoloaded activities in the store
 * @param {Object} state the current state
 * @param {Object} action contains the payload
 * * @param {Object} action.payload contains the object which also
 * * contains the information about the succesfully uploaded activities action
 */
function setUploadedActivities(state, action) {
  const importResult = action.payload;
  return {
    ...state,
    importResult,
  };
}

/**
 * Set Errors about activities to the store
 * @param {Object} state the current state
 * @param {Object} action action that contains the payload of the response
 * * @param {Object} action.payload contains all the information about the errors
 * * ocurred when actions was executed
 */
function setActivitiesErrors(state, action) {
  return {
    ...state,
    errors: {
      ...state.errors,
      ...action.payload,
    },
    importResult: {
      ...state.importResult,
    },
  };
}

/**
 * Set activities to the store
 * @param {Object} state the current state
 * @param {Object} action action that contains the payload of the response
 * * @param {Object} action.payload contains all the list of activities
 * *
 */
function setActivities(state, action) {
  return {
    errors: {
      ...state.errors,
    },
    importResult: {
      ...state.importResult,
    },
    activities: action.payload,
  };
}

/**
 * ClearMessages function that sets the initial state empty in error and import messages
 * @param {Object} state state actual
 */
function clearMessages(state) {
  const errors = {
    uploadActivities: {
      code: '',
      message: '',
    },
    getActivities: {
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
 * Activities reducer to set the activities for the store
 * @param {Object} state to current state of the store
 * @param {Object} action that contains the type of the action
 * * @param {Object} action.type the type of the action called
 */
export default function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_UPLOADED_ACTIVITIES().type:
      return setUploadedActivities(state, action);

    case actions.SET_ERRORS().type:
      return setActivitiesErrors(state, action);

    case actions.SET_ACTIVITIES().type:
      return setActivities(state, action);

    case actions.CLEAR_MESSAGES().type:
      return clearMessages(state);

    default:
      return state;
  }
}
