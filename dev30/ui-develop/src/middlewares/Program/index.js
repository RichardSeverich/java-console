import actions from 'actions/Program';
import loadingErrorActions from 'actions/LoadingError';
import api from 'api/Program';

/**
 * GetPrograms function that dispatch all the programs of the api
 * to the store or dispatch an error if the request was invalid
 * also to the store
 * @param {Function} dispatch dispatch action to disaptch to the store
 */
async function getPrograms(dispatch) {
  try {
    const result = await api.getAll();
    dispatch(actions.SET_PROGRAMS(result));
    dispatch(actions.SET_ERRORS({ getAll: { code: '', message: '' } }));
  } catch (errorPrograms) {
    dispatch(actions.SET_PROGRAMS([]));
    dispatch(actions.SET_ERRORS({ getAll: errorPrograms }));
  }
}

/**
 * ImportPrograms function that dispatch the response obtenined
 * from the api, dispatch a SET_IMPORT_PROGRAMS action when
 * the response of the api is success, dispatch SET_ERRORS
 * action when the response of the is an error
 * @param {Object} action action object that contains the data
 * to send in the payload
 * @param {Function} dispatch dispatch function to dispach the
 * response to the store
 */
async function importProgramsCSV(action, dispatch) {
  try {
    const result = await api.importPrograms(action.payload);
    dispatch(actions.SET_IMPORT_PROGRAMS(result));
    dispatch(actions.SET_ERRORS({ importCSV: { code: '', message: '' } }));
  } catch (error) {
    dispatch(actions.SET_ERRORS({ importCSV: error }));
    dispatch(
      actions.SET_IMPORT_PROGRAMS({
        message: '',
        total: '',
        saved: '',
        failed: '',
      })
    );
  }
}

/**
 * GetProgram function that dispatch a program of the api
 * to the store or dispatch an error if the request was invalid
 * also to the store
 * @param {Function} dispatch  action to dispatch to the store
 */
async function getProgram(action, dispatch) {
  dispatch(loadingErrorActions.START_LOADING());
  try {
    const result = await api.getProgram(action.payload);
    dispatch(actions.SET_PROGRAM(result));
    dispatch(actions.SET_ERRORS({ getProgram: { code: '', message: '' } }));
  } catch (error) {
    dispatch(loadingErrorActions.SET_ERROR(error));
    dispatch(actions.SET_ERRORS({ getProgram: error }));
  }
  dispatch(loadingErrorActions.STOP_LOADING());
}

/**
 * Update program function that sets up the program data, this function
 * makes an api request that sets up new program data if a request is invalid
 * the program data is not changed
 * @param {Object} action action object that contains the data
 * to send in the payload
 * @param {Function} dispatch dispatch function to dispach the
 * response to the store
 */
async function updateProgram(action, dispatch) {
  try {
    const updatedProgram = await api.updateProgram(action.payload.id, {
      description: action.payload.description,
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
    });
    const result = await api.getProgram(updatedProgram.id);
    dispatch(actions.SET_PROGRAM(result));
    dispatch(actions.SET_ERRORS({ updateProgram: { code: '', message: '' } }));
  } catch (error) {
    dispatch(actions.SET_ERRORS({ updateProgram: error }));
  }
}

/**
 * Program middleware function that intercept the request from the container
 * to the API
 * @param {Object} store store of the program middleware
 */
export default function programMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.FETCH_PROGRAMS().type:
        await getPrograms(dispatch);
        break;

      case actions.IMPORT_PROGRAMS().type:
        await importProgramsCSV(action, dispatch);
        break;

      case actions.GET_PROGRAM().type:
        await getProgram(action, dispatch);
        break;

      case actions.UPDATE_PROGRAM().type:
        await updateProgram(action, dispatch);
        break;

      default:
        next(action);
        break;
    }
  };
}
