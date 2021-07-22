import actions from 'actions/Teams';
import api from 'api/Teams';

/**
 * importTeams function that dispatch the response obtenined
 * from the api, dispatch a SET_IMPORT_TEAMS action when
 * the response of the api is success, dispatch SET_ERRORS
 * action when the response of the api is an error
 * @param {Object} action action object that contains the data
 * to send in the payload
 * @param {Function} dispatch dispatch function to dispach the
 * response to the store
 */
async function importTeamsFile(action, dispatch) {
  try {
    const result = await api.importTeams(action.payload);
    dispatch(actions.SET_IMPORT_TEAMS(result));
    dispatch(actions.SET_ERRORS({ import: { code: '', message: '' } }));
  } catch (error) {
    dispatch(actions.SET_ERRORS({ import: error }));
    dispatch(
      actions.SET_IMPORT_TEAMS({
        message: '',
        total: '',
        saved: '',
        failed: '',
      })
    );
  }
}

export default function teamsMiddleware(store) {
  const { dispatch } = store;
  return (next) => async (action) => {
    switch (action.type) {
      case actions.IMPORT_TEAMS().type:
        await importTeamsFile(action, dispatch);
        break;

      default:
        next(action);
        break;
    }
  };
}
