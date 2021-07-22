import actions from 'actions/Program';

const initialState = {
  programs: [],
  errors: {
    getAll: {
      code: '',
      message: '',
    },
    importCSV: {
      code: '',
      message: '',
    },
    getProgram: {
      code: '',
      message: '',
    },
    updateProgram: {
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
  selectedProgram: {
    id: 0,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  },
  programToEdit: {},
};

/**
 * SetPrograms function to set the programs to the state
 * @param {Object} action action that contains the array
 * of programs
 * * @param {Array} action.payload payload array of programs
 */
function setPrograms(state, action) {
  const programs = action.payload;
  return {
    ...state,
    programs,
  };
}

/**
 * SetProgramErrors function to set the errors to the state
 * @param {Object} state actual state
 * @param {Object} action action contains the errors
 * * @param {Object} action.payload payload contains the specific error,
 * * could be getAll error, or importCSV error, the one error that is captured
 * * will be set in the store
 */
function setProgramErrors(state, action) {
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
 * SetImportPrograms function that sets the response of the
 * importPrograms function in the state
 * @param {Object} state state actual
 * @param {Object} action action which contains the payload to store
 */
function setImportPrograms(state, action) {
  const importResult = action.payload;
  return {
    ...state,
    importResult,
  };
}

/**
 * ClearPrograms function that sets the initial state empty
 */
function clearPrograms() {
  return {
    ...initialState,
  };
}

/**
 * ClearMessages function that sets the initial state empty in error and import messages
 * @param {Object} state state actual
 */
function clearMessages(state) {
  const errors = {
    getAll: {
      code: '',
      message: '',
    },
    importCSV: {
      code: '',
      message: '',
    },
    getProgram: {
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
 * setProgram function that set the response of the
 * getProgram function in the state
 * @param {Object} state state actual
 * @param {Object} action action which contains the payload to store
 */
function setProgram(state, action) {
  const selectedProgram = action.payload;
  return {
    ...state,
    selectedProgram,
  };
}

function setProgramToEdit(action, state) {
  const selectedProgram = {
    ...state.selectedProgram,
    ...action.payload,
  };
  return {
    ...state,
    selectedProgram,
  };
}

function clearProgram(state) {
  const selectedProgram = {
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  };
  return {
    ...state,
    selectedProgram,
  };
}

/**
 * Program reducer to set the program for the app
 * @param {Object} state state to replace the inital state
 * @param {Object} action action that contains the action given
 * * @param {Object} action.type type of the action that indicates what action will be executed
 */
export default function programReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_PROGRAMS().type:
      return setPrograms(state, action);

    case actions.SET_ERRORS().type:
      return setProgramErrors(state, action);

    case actions.CLEAR_PROGRAMS().type: {
      return clearPrograms();
    }

    case actions.SET_IMPORT_PROGRAMS().type: {
      return setImportPrograms(state, action);
    }

    case actions.SET_PROGRAM().type: {
      return setProgram(state, action);
    }

    case actions.CLEAR_PROGRAM().type: {
      return clearProgram(state);
    }

    case actions.CLEAR_MESSAGES().type:
      return clearMessages(state);

    case actions.SET_PROGRAM_TO_EDIT().type:
      return setProgramToEdit(action, state);

    default:
      return state;
  }
}
