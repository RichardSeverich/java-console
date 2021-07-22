import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'reducers';
import middlewares from 'middlewares';

/**
 * Function that creates the principal store that is composed
 * of the root reducer and all middlewares, these middlewares
 * are composed with dev tools
 */
export default function createAppStore() {
  const composed = composeWithDevTools(applyMiddleware(...middlewares));
  return createStore(rootReducer, composed);
}
