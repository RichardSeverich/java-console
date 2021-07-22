import actions from 'actions/LoadingError';

const initialState = {
  loading: true,
  error: {
    code: '',
    message: '',
  },
};

/**
 * Function to be called when there is a loading event
 **/
function startLoading() {
  return {
    ...initialState,
    loading: true,
  };
}

/**
 * Signin function when error is captured, also to setUp in the state
 * @param {Object} action.payload.error Incoming error information
 * * @param {Number} action.payload.error.code Numeric code of the error
 * * @param {String} action.payload.error.message String message of the error
 **/
function setError(state, action) {
  const commingError = action.payload;
  return {
    ...state,
    error: commingError,
  };
}

/**
 * Function to be called when and error is cleared or a loading has ended.
 **/
function stopLoading(state) {
  return {
    ...state,
    loading: false,
  };
}

export default function LoadingErrorReducer(state = initialState, action) {
  switch (action.type) {
    case actions.START_LOADING().type:
      return startLoading();
    case actions.SET_ERROR().type:
      return setError(state, action);
    case actions.STOP_LOADING().type:
      return stopLoading(state);
    default:
      return state;
  }
}
