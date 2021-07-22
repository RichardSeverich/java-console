import { createSelector } from 'reselect';
import {
  CANDIDATE_DISMISSED,
  CANDIDATE_LICENSED,
  CANDIDATE_ACTIVE,
} from 'app/constant/CandidatesStatus';

const candidatesSelector = (state) => state.candidates;
const candidatesList = (state) => state.candidates.candidates;
const candidatesImportResultSelector = (state) => state.candidates.importResult;

/**
 * Function that returns the saved records number of importResult
 * object of the candidates store
 */
export const getSavedResult = createSelector(
  candidatesImportResultSelector,
  (importResult) => {
    return importResult.saved.toString();
  }
);

/**
 * Function that returs the failed records number result of importResult
 * object of the candidates store
 */
export const getFailedResult = createSelector(
  candidatesImportResultSelector,
  (importResult) => {
    return importResult.failed.toString();
  }
);

/**
 * Function that returs the importError object of the candidates store
 */
export const getImportError = createSelector(
  candidatesSelector,
  (candidates) => {
    return candidates.errors.uploadCandidates;
  }
);

/**
 * Function that returns a filtered list to checkStatus,
 * from the candidates list
 */
export const filterCandidatesByStatus = createSelector(
  candidatesList,
  (candidates) => (checkStatus) => {
    if (!candidates) {
      return [];
    }
    const licensed = !checkStatus.licensed ? CANDIDATE_LICENSED : '';
    const dismissed = !checkStatus.dismissed ? CANDIDATE_DISMISSED : '';
    const active = !checkStatus.active ? CANDIDATE_ACTIVE : '';
    return candidates.filter(
      (element) =>
        element.status !== licensed &&
        element.status !== dismissed &&
        element.status !== active
    );
  }
);

/**
 * Function that returns the number of elements from a
 * from a status param
 */
export const countCandidatesByStatus = createSelector(
  candidatesList,
  (candidates) => (param) => {
    if (!candidates) {
      return 0;
    }
    return candidates.filter((element) => element.status === param).length;
  }
);
