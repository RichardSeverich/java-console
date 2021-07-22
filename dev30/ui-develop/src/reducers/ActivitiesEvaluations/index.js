import actions from 'actions/ActivitiesEvaluations';

const initialState = {
  evaluationsResults: [],
  errors: {
    uploadActivitiesEvaluations: {
      code: '',
      message: '',
    },
    getEvaluations: {
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
 * Function that sets the result of upload Activities Evaluations function
 * after it was succesfull
 * @param {Object} state current state of the store
 * @param {Object} action contains the payload to save in the store
 * * @param {Object} action.payload contains the import result object
 */
function setUploadedActivitiesEvaluations(state, action) {
  const importResult = action.payload;
  return {
    ...state,
    importResult,
  };
}

/**
 * Function that sets the current errors in the store
 * @param {Object} state current state of the store
 * @param {Object} action contains the payload to save in the store
 * @param {Object} action.payload contains the current errors to be save in the store
 */
function setErrors(state, action) {
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
 * Function that cleans the errors object and the importResult object
 * @param {Object} state current state of the store
 */
function clearMessages(state) {
  const errors = {
    uploadActivitiesEvaluations: {
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
 * Set evaluations result to the store
 * @param {Object} state the current state
 * @param {Object} action action that contains the payload of the response
 * * @param {Object} action.payload contains all the list of evaluations result
 * *
 */
function setEvaluationsResult(state, action) {
  return {
    ...state,
    evaluationsResults: action.payload,
  };
}

/**
 * Activities Evaluations reducer to set the activities evaluations for the store
 * @param {Object} state to current state of the store
 * @param {Object} action that contains the type of the action
 * * @param {Object} action.type the type of the action called
 */
export default function activitiesEvaluationsReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case actions.SET_UPLOADED_ACTIVITIES_EVALUATIONS().type:
      return setUploadedActivitiesEvaluations(state, action);

    case actions.SET_ERRORS().type:
      return setErrors(state, action);

    case actions.CLEAR_MESSAGES().type:
      return clearMessages(state);

    case actions.SET_EVALUATIONS_RESULT().type:
      return setEvaluationsResult(state, action);

    default:
      return state;
  }
}
