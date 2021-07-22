import actions from 'actions/Search';
import api from 'api/Search';
import convert from 'app/helpers/stringValidator';
import SearchMapper from 'app/mappers/SearchCandidateMapper';
import ErrorNotFound from 'app/mappers/ErrorNotFound';

/** Search Candidates function that dispatch the response obtained
 * from the api, dispatch SEARCH_CANDIDATES action when the
 * response of the api was success, dispatch SET_ERRORS action when
 * the response of the api was rejected
 * @param {Function} dispatch function to dispatch the action to the reducer
 */

async function searchCandidates(action, dispatch) {
  try {
    const request = convert.requestFormat(action.payload);
    const response = await api.searchCandidates(request);
    const result = new SearchMapper(response);
    if (result.code === 204) {
      dispatch(actions.SET_SEARCH_CANDIDATES([]));
      return dispatch(
        actions.SET_ERRORS({
          notFoundError: new ErrorNotFound('204', 'Candidate Not Found'),
        })
      );
    }
    dispatch(actions.SET_SEARCH_CANDIDATES(result.getCandidates()));
    return dispatch(
      actions.SET_ERRORS({
        searchCandidates: new ErrorNotFound(),
        notFoundError: new ErrorNotFound(),
      })
    );
  } catch (error) {
    dispatch(
      actions.SET_ERRORS({
        searchCandidates: error,
        notFoundError: new ErrorNotFound(),
      })
    );
    return dispatch(actions.SET_SEARCH_CANDIDATES([]));
  }
}

/**
 * Search Middleware function that intercepts the request betweeen the
 * container and the reducer, this makes all the request to the Api.
 * @param {Object} store the store of the searc
 */
export default function searchMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.SEARCH_CANDIDATES().type:
        await searchCandidates(action, dispatch);
        break;

      default:
        next(action);
        break;
    }
  };
}
