import actions from 'actions/Stages';
import api from 'api/Stages';

/**
 * ImportStages function that dispatch the response obtained
 * from the api, dispatch a IMPORT_STAGES_SUCCESS action when
 * the response of the API is success, dispatch SET_STAGES_ERROR
 * action when the response is an error
 * @param {Object} action action object that contains the data to
 * send in the payload
 * @param {Function} dispatch dispatch function to dispatch the
 * response to the Store
 */
async function importStagesJSON(action, dispatch) {
  try {
    const result = await api.importStages(action.payload);
    dispatch(
      actions.SET_STAGES_ERROR({ importJSON: { code: 0, message: '' } })
    );
    dispatch(actions.IMPORT_STAGES_SUCCESS(result));
  } catch (error) {
    dispatch(actions.SET_STAGES_ERROR({ importJSON: error }));
    dispatch(
      actions.IMPORT_STAGES_SUCCESS({
        message: '',
        total: '',
        saved: '',
        failed: '',
      })
    );
  }
}

/**
 * Get all program's stages that dispatch the obtained response from the api
 *
 * @param {Object} action object that contains the data to send to the payload
 * @param {Function} dispatch dispatch function to dispatch the
 * response to the Store
 */
async function getProgramStages(action, dispatch) {
  try {
    const result = await api.getProgramStages(action.payload);
    dispatch(actions.SET_SELECTED_PROGRAM_STAGES(result));
    dispatch(
      actions.SET_STAGES_ERROR({
        getProgramStages: { code: 0, message: '' },
      })
    );
  } catch (error) {
    dispatch(actions.SET_STAGES_ERROR({ getProgramStages: error }));
  }
}

/**
 * Update all stages of a program and dispatch a SET_SELECTED_PROGRAM_STAGES action
 * when the response of the api is successful otherwise dispatch a SET_STAGES_ERROR action
 *
 * @param {Object} action object that contains the program id and stages list
 * * @param {number} action.programId is the identifier of a program
 * * @param {ProgramStage[]} action.stages are the updated stages of a program.
 * * * @param {number} ProgramStage.id is the identifier of the stage
 * * * @param {string} ProgramStage.name is the name of the stage
 * * * @param {number} ProgramStage.order is a unique number of the stage
 * * * @param {number} ProgramStage.startDate is a unique date of the stage
 * @param {Function} dispatch function to dispatch the
 * response to the Store
 */
async function updateProgramStages(action, dispatch) {
  try {
    await api.updateProgramStages(action.payload.stages);
    dispatch(actions.FETCH_PROGRAM_STAGES(action.payload.programId));
    dispatch(
      actions.SET_STAGES_ERROR({
        updateProgramStages: { code: 0, message: '' },
      })
    );
  } catch (error) {
    dispatch(actions.SET_STAGES_ERROR({ updateProgramStages: error }));
  }
}

/**
 * Stages middleware function that intercept the request from the container
 * to the API
 * @param {Object} store store of the program middleware
 */
export default function stagesMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.IMPORT_STAGES().type:
        await importStagesJSON(action, dispatch);
        break;
      case actions.FETCH_PROGRAM_STAGES().type:
        await getProgramStages(action, dispatch);
        break;
      case actions.UPDATE_PROGRAM_STAGES().type:
        await updateProgramStages(action, dispatch);
        break;
      default:
        next(action);
        break;
    }
  };
}
