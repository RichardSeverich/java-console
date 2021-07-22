import actions from 'actions/Search';

const initialState = {
  searchCandidates: [],
  errors: {
    searchCandidates: {
      code: '',
      message: '',
    },
    notFoundError: {
      code: '',
      message: '',
    },
  },
};

/**
 * Function that sets the errors of search actions after
 * they were called
 * @param {Object} state current state of the store
 * @param {Function} action action that contains the errors
 * * @param {Object} action.payload object that contains the current errors
 * * @param {Object} state.errors current errors object of the store
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
 * Set search candidates to the store
 * @param {Object} state the current state
 * @param {Object} action action that contains the payload of the response
 * @param {Object} action.payload contains all the list of candidates found
 * *
 */
function setSearchCandidates(state, action) {
  return {
    ...state,
    searchCandidates: action.payload,
  };
}

/**
 * Candidates reducer to set the candidates to the Store
 * @param {Object} state current state of candidates in the store
 * @param {Object} action contains the type of the action
 * * @param {String} action.type type of the action called
 */
export default function candidatesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ERRORS().type:
      return setErrors(state, action);

    case actions.SET_SEARCH_CANDIDATES().type:
      return setSearchCandidates(state, action);

    default:
      return state;
  }
}
