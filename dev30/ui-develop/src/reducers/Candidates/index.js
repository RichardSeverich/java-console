import actions from 'actions/Candidates';

const initialState = {
  candidates: [],
  errors: {
    uploadCandidates: {
      code: '',
      message: '',
    },
    getCandidates: {
      code: '',
      message: '',
    },
    setSelectedCandidate: {
      code: '',
      message: '',
    },
    getCandidatePrograms: {
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
  selectedCandidate: {
    id: null,
    firstName: '',
    lastName: '',
    city: '',
    birthdate: '',
    email: '',
    university: '',
    career: '',
    semester: '',
    cellphone: '',
  },
  candidatePrograms: [],
};

/**
 * ClearMessages function that sets the initial state empty in error
 * and import messages
 * @param {Object} state state actual
 */
function clearMessages(state) {
  const errors = {
    uploadCandidates: {
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
 * Function that sets the uploadActivities result in the store
 * @param {Object} state current state of the store
 * @param {Function} action action that contains the payload
 * * @param {Object} action.payload object that contains the importResult
 * * which contains the message, total, saved and failed values
 */
function setUploadedCandidates(state, action) {
  const importResult = action.payload;
  return {
    ...state,
    importResult,
  };
}

/**
 * Reducer that is dispathed when a candidate is selected
 * @param {object} state is the current state of the store
 * @param {object} action is the action that was dispatched
 * * @param {object} action.payload is the selected candidate information
 * * * @param {number} id is the identifier of the candidate
 * * * @param {string} firstName is the first name of the selected candidate
 * * * @param {string} lastName is the last name of the candidate
 * * * @param {string} city the city of the candidate is from
 * * * @param {string} birthdate is the date that was born the selected candidate
 * * * @param {string} email is the personal email of the candidate
 * * * @param {string} university is the university of the candite where has studied
 * * * @param {string} career is the career that the candidate has studied
 * * * @param {string} semester is the semester in which is the selected candidate
 */
function setSelectedCandidate(state, action) {
  const selectedCandidate = action.payload;
  return {
    ...state,
    selectedCandidate,
  };
}

/**
 * Set activities to the store
 * @param {Object} state the current state
 * @param {Object} action action that contains the payload of the response
 * * @param {Object} action.payload contains all the list of activities
 * *
 */
function setGottenCandidates(state, action) {
  return {
    errors: {
      ...state.errors,
    },
    importResult: {
      ...state.importResult,
    },
    candidates: action.payload,
  };
}

/**
 * Set candidate programs to the store
 * @param {Object} state the current state
 * @param {Object} action action that contains the payload of the response
 * * @param {Object} action.payload contains all the list of programs related to a candidate
 * *
 */
function setCandidatePrograms(state, action) {
  return {
    ...state,
    candidatePrograms: action.payload,
  };
}

/**
 * Function that sets the errors of candidates actions after
 * they were called
 * @param {Object} state current state of the store
 * @param {Function} action action that contains the errors
 * * @param {Object} action.payload object that contains the current errors
 * * @param {Object} state.erorrs current errors object of the store
 * * @param {Object} state.importResult current importResult object of the store
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
 * Candidates reducer to set the candidates to the Store
 * @param {Object} state current state of candidates in the store
 * @param {Object} action contains the type of the action
 * * @param {String} action.type type of the action called
 */
export default function candidatesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CLEAR_MESSAGES().type:
      return clearMessages(state);

    case actions.SET_UPLOADED_CANDIDATES().type:
      return setUploadedCandidates(state, action);

    case actions.SET_ERRORS().type:
      return setErrors(state, action);

    case actions.SET_CANDIDATES().type:
      return setGottenCandidates(state, action);

    case actions.SET_SELECTED_CANDIDATE().type:
      return setSelectedCandidate(state, action);

    case actions.SET_CANDIDATE_PROGRAMS().type:
      return setCandidatePrograms(state, action);

    default:
      return state;
  }
}
