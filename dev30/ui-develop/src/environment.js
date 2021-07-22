const environment = {
  AUTH: '/auth',
  ACTIVITIES: '/activities',
  CANDIDATES: '/candidates',
  RESULT_EVALUATIONS: '/result-evaluations',
  HISTORY: '/history',
  LOGIN: '/signin',
  PROGRAMS: '/programs',
  STAGES: '/stages',
  TEAMS: '/teams',
  UPLOAD: '/upload',
  USERS: '/users',
  SEARCH: '/search',
};

if (process.env.NODE_ENV === 'test') {
  environment.URL = 'http://localhost:9000/api/v1';
}

if (process.env.NODE_ENV === 'development') {
  environment.URL = 'http://localhost:9000/api/v1';
}

if (process.env.NODE_ENV === 'prod') {
  environment.URL = process.env.REACT_APP_BACKEND_UR;
}

export default environment;
