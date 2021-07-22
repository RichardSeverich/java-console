import actions from 'actions/Candidates/index';
import api from 'api/Candidates';

/**
 * Upload candidates function that calls to the upload candidates Api function,
 * and if response of Api is success then this dispatch the response to the
 * reducer throught the SET_UPLOADED_CANDIDATES function, if the response of
 * Api fails, this dispatch the error to the reducer throught the SET_ERRORS function
 * @param {Object} action contains the data that will be called within the Api function
 * * @param {Object} action.payload contains the file that will be send to the Api
 * @param {Function} dispatch disatches an action to the reducer
 */
async function uploadCandidates(action, dispatch) {
  try {
    const response = await api.uploadCandidates(action.payload);
    dispatch(actions.SET_UPLOADED_CANDIDATES(response.data));
    dispatch(
      actions.SET_ERRORS({
        uploadCandidates: {
          code: '',
          message: '',
        },
      })
    );
  } catch (error) {
    dispatch(actions.SET_ERRORS({ uploadCandidates: error }));
    dispatch(
      actions.SET_UPLOADED_CANDIDATES({
        message: '',
        total: '',
        saved: '',
        failed: '',
      })
    );
  }
}

/**
 * Get Candidates function that dispatch the response obtained
 * from the api, dispatch SET_CANDIDATES action when the
 * response of the api was success, dispatch SET_ERRORS action when
 * the response of the api was rejected
 * @param {Function} dispatch function to dispatch the action to the reducer
 */
async function getCandidates(action, dispatch) {
  try {
    const response = await api.getCandidates(action.payload);
    dispatch(actions.SET_CANDIDATES(response));
    dispatch(actions.SET_ERRORS({ getCandidates: { code: '', message: '' } }));
  } catch (error) {
    dispatch(actions.SET_ERRORS({ getCandidates: error }));
    dispatch(actions.SET_CANDIDATES([]));
  }
}

/**
 * Get Candidates function that dispatch the response obtained
 * from the api, dispatch SET_CANDIDATES action when the
 * response of the api was success, dispatch SET_ERRORS action when
 * the response of the api was rejected
 * @param {Function} dispatch function to dispatch the action to the reducer
 */
async function getCandidate(action, dispatch) {
  try {
    const response = await api.getCandidate(action.payload);
    dispatch(actions.SET_SELECTED_CANDIDATE(response));
    dispatch(
      actions.SET_ERRORS({ setSelectedCandidate: { code: '', message: '' } })
    );
  } catch (error) {
    dispatch(actions.SET_ERRORS({ setSelectedCandidate: error }));
    dispatch(
      actions.SET_SELECTED_CANDIDATE({
        id: null,
        firstName: '',
        lastName: '',
        city: '',
        birthdate: '',
        email: '',
        university: '',
        career: '',
        semester: '',
      })
    );
  }
}

/**
 * Get Candidate programs function that dispatch the response obtained
 * from the api.
 * dispatch GET_CANDIDATE_PROGRAMS action when the response of the api was success
 * SET_ERRORS action when the response of the api was rejected
 * @param {Function} dispatch function to dispatch the action to the reducer
 */
async function getCandidatePrograms(action, dispatch) {
  try {
    const response = await api.getCandidatePrograms(action.payload);
    dispatch(actions.SET_CANDIDATE_PROGRAMS(response));
    dispatch(
      actions.SET_ERRORS({ getCandidatePrograms: { code: '', message: '' } })
    );
  } catch (error) {
    dispatch(actions.SET_ERRORS({ getCandidatePrograms: error }));
    dispatch(actions.SET_CANDIDATE_PROGRAMS([]));
  }
}

/**
 * Candidates Middleware function that intercepts the request betweeen the
 * container and the reducer, this makes all the request to the Api.
 * @param {Object} store the store of the candidates
 */
export default function candidatesMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.UPLOAD_CANDIDATES().type:
        await uploadCandidates(action, dispatch);
        break;

      case actions.GET_CANDIDATES().type:
        await getCandidates(action, dispatch);
        break;

      case actions.FETCH_CANDIDATE().type:
        await getCandidate(action, dispatch);
        break;

      case actions.GET_CANDIDATE_PROGRAMS().type:
        await getCandidatePrograms(action, dispatch);
        break;

      default:
        next(action);
        break;
    }
  };
}
