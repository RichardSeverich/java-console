import { createSelector } from 'reselect';

const activitiesEvaluationsSelector = (state) => state.activitiesEvaluations;
const activitiesEvaluatiosImportResultSelector = (state) =>
  state.activitiesEvaluations.importResult;

/**
 * Function that returns the saved records number of importResult
 * object of the activities evaluations store
 */
export const getSavedResult = createSelector(
  activitiesEvaluatiosImportResultSelector,
  (importResult) => {
    return importResult.saved.toString();
  }
);

/**
 * Function that returs the failed records number result of importResult
 * object of the activities evaluations store
 */
export const getFailedResult = createSelector(
  activitiesEvaluatiosImportResultSelector,
  (importResult) => {
    return importResult.failed.toString();
  }
);

/**
 * Function that returs the importError object of the activities evaluations store
 */
export const getImportError = createSelector(
  activitiesEvaluationsSelector,
  (activitiesEvaluations) => {
    return activitiesEvaluations.errors.uploadActivitiesEvaluations;
  }
);
