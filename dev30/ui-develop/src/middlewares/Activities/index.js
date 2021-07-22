import actions from 'actions/Activities';
import api from 'api/Activities';

/**
 * Upload Activities function that dispatch the response obtained
 * from the api, dispatch SET_UPLOADED_ACTIVITIES action when the
 * response of the api was success, dispatch SET_ERRORS action when
 * the response of the api was rejected all dispatches are to the reducer
 * @param {Object} action that contains the data to send to the reducer
 * * @param {Object} action.payload contains the Object response success
 * @param {Function} dispatch function to dispatch the action to the reducer
 */
async function uploadActivities(action, dispatch) {
  try {
    const response = await api.uploadActivities(action.payload);
    dispatch(actions.SET_UPLOADED_ACTIVITIES(response.data));
    dispatch(
      actions.SET_ERRORS({
        uploadActivities: {
          code: '',
          message: '',
        },
      })
    );
  } catch (error) {
    dispatch(actions.SET_ERRORS({ uploadActivities: error }));
    dispatch(
      actions.SET_UPLOADED_ACTIVITIES({
        message: '',
        total: '',
        saved: '',
        failed: '',
      })
    );
  }
}

/**
 * Get Activities function that dispatch the response obtained
 * from the api, dispatch SET_ACTIVITIES action when the
 * response of the api was success, dispatch SET_ERRORS action when
 * the response of the api was rejected
 * @param {Function} dispatch function to dispatch the action to the reducer
 */
async function getActivities(action, dispatch) {
  try {
    const response = await api.getActivities(action.payload);
    dispatch(actions.SET_ACTIVITIES(response));
    dispatch(actions.SET_ERRORS({ getActivities: { code: '', message: '' } }));
  } catch (error) {
    dispatch(actions.SET_ERRORS({ getActivities: error }));
    dispatch(actions.SET_ACTIVITIES([]));
  }
}

/**
 * Activities middleware function that intercept the request from
 * the container to the API
 * @param {Object} store store of the activities middleware
 */
export default function activityMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.UPLOAD_ACTIVITIES().type:
        await uploadActivities(action, dispatch);
        break;

      case actions.GET_ACTIVITIES().type:
        await getActivities(action, dispatch);
        break;

      default:
        next(action);
        break;
    }
  };
}
