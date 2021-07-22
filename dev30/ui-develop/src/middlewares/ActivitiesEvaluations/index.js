import actions from 'actions/ActivitiesEvaluations';
import api from 'api/ActivitiesEvaluations';

/**
 * Function that dispatch the response obtained from the api,
 * dispatch SET_UPLOADED_ACTIVITIES_EVALUATIONS action when the response
 * of the api was success, dispatch SET_ERRORS action when the response
 * of the api was rejected all dispatches are to the reducer
 * @param {Object} action that contains the data to send to the reducer
 * * @param {Object} action.payload contains the Object response success
 * @param {Function} dispatch function to dispatch the action to the reducer
 */
async function uploadActivitiesEvaluations(action, dispatch) {
  try {
    const response = await api.uploadActivitiesEvaluations(action.payload);
    dispatch(actions.SET_UPLOADED_ACTIVITIES_EVALUATIONS(response.data));
    dispatch(
      actions.SET_ERRORS({
        uploadActivitiesEvaluations: {
          code: '',
          message: '',
        },
      })
    );
  } catch (error) {
    dispatch(actions.SET_ERRORS({ uploadActivitiesEvaluations: error }));
    dispatch(
      actions.SET_UPLOADED_ACTIVITIES_EVALUATIONS({
        message: '',
        total: '',
        saved: '',
        failed: '',
      })
    );
  }
}

/**
 * Get Evaluations result function that dispatch the response obtained
 * from the api, dispatch SET_EVALUATIONS_RESULT action when the
 * response of the api was success, dispatch SET_ERRORS action when
 * the response of the api was rejected
 * @param {Function} dispatch function to dispatch the action to the reducer
 */
async function getEvaluationsResult(action, dispatch) {
  try {
    const response = await api.getEvaluationsResult(action.payload);
    dispatch(actions.SET_EVALUATIONS_RESULT(response));
    dispatch(actions.SET_ERRORS({ getEvaluations: { code: '', message: '' } }));
  } catch (error) {
    dispatch(actions.SET_ERRORS({ getEvaluations: error }));
    dispatch(actions.SET_EVALUATIONS_RESULT([]));
  }
}

/**
 * Function that intercept the request from the container to the API
 * @param {Object} store store of the activities evaluations middleware
 */
export default function activityEvaluationsMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.UPLOAD_ACTIVITIES_EVALUATIONS().type:
        await uploadActivitiesEvaluations(action, dispatch);
        break;

      case actions.GET_EVALUATIONS_RESULT().type:
        await getEvaluationsResult(action, dispatch);
        break;

      default:
        next(action);
        break;
    }
  };
}
