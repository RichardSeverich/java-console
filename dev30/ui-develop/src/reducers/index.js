import { combineReducers } from 'redux';

import login from 'reducers/Login';
import program from 'reducers/Program';
import userMaintenance from 'reducers/User';
import stages from 'reducers/Stages';
import teams from 'reducers/Teams';
import activities from 'reducers/Activities';
import candidates from 'reducers/Candidates';
import activitiesEvaluations from 'reducers/ActivitiesEvaluations';
import search from 'reducers/Search';
import loadingError from 'reducers/LoadingError';

/**
 * Root reducer that combines all reducers of the
 * application
 */
const rootReducer = combineReducers({
  login,
  program,
  userMaintenance,
  stages,
  teams,
  activities,
  candidates,
  activitiesEvaluations,
  search,
  loadingError,
});

export default rootReducer;
