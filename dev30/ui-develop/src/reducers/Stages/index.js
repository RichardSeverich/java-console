import actions from 'actions/Stages';
import ProgramStage from 'app/mappers/ProgramStage';

const initialState = {
  errors: {
    getProgramStages: {
      code: 0,
      message: '',
    },
    updateProgramStages: {
      code: 0,
      message: '',
    },
    importJSON: {
      code: 0,
      message: '',
    },
  },
  importResult: {
    message: '',
    total: '',
    saved: '',
    failed: '',
  },
  programStages: [],
};

/**
 * setErrors function to set the error to the state
 * @param {Object} state actual state
 * @param {Object} action action that contains the error
 * @param {Object} action.payload payload object that contains the error object
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
 * setImportStages function that sets the response of the
 * importStages function in the state
 * @param {Object} state state actual
 * @param {Object} action action wich contains the payload to store
 */
function setImportStages(state, action) {
  const importResult = action.payload;
  return {
    ...state,
    importResult,
  };
}

/**
 * Sets program stages that sets up a collection of stages
 * @param {Object} state of the store
 * @param {Objec} action that contains the payload
 */
function setProgramStages(state, action) {
  const programStages = action.payload;
  return {
    ...state,
    programStages,
  };
}

/**
 * ClearMessages function that sets the initial state empty in error and import messages
 * @param {Object} state state actual
 */
function clearMessages(state) {
  const errors = {
    getProgramStages: {
      code: 0,
      message: '',
    },
    updateProgramStages: {
      code: 0,
      message: '',
    },
    importJSON: {
      code: 0,
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

function updateStageById(state, { payload }) {
  const { programStages } = state;
  const newsStages = programStages.map((stage) => {
    if (stage.id === payload.id) {
      return new ProgramStage(
        payload.id,
        payload.order,
        payload.name,
        payload.startDate
      );
    }
    return stage;
  });
  return {
    ...state,
    programStages: [...newsStages],
  };
}

/**
 * Program reducer to set the Stages for the app
 * @param {Object} state state to replace the initial state
 * @param {Object} action action that contains the action given
 * @param {Object} action.type type of the action that inicates what action will be executed
 */
export default function stagesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STAGES_ERROR().type:
      return setErrors(state, action);

    case actions.IMPORT_STAGES_SUCCESS().type:
      return setImportStages(state, action);

    case actions.SET_SELECTED_PROGRAM_STAGES().type:
      return setProgramStages(state, action);

    case actions.CLEAR_MESSAGES().type:
      return clearMessages(state);

    case actions.UPDATE_STAGE().type:
      return updateStageById(state, action);
    default:
      return state;
  }
}
