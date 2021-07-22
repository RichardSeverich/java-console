import login from 'middlewares/Login';
import program from 'middlewares/Program';
import user from 'middlewares/User';
import stages from 'middlewares/Stages';
import teams from 'middlewares/Teams';
import activities from 'middlewares/Activities';
import candidates from 'middlewares/Candidates';
import activitiesEvaluations from 'middlewares/ActivitiesEvaluations';
import search from 'middlewares/Search';

export default [
  login,
  program,
  user,
  stages,
  activities,
  teams,
  candidates,
  activitiesEvaluations,
  search,
];
