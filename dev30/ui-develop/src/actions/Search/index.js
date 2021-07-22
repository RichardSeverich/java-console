import {
  SEARCH_CANDIDATES,
  SET_SEARCH_CANDIDATES,
  SET_ERRORS,
} from 'app/constant/Search';
import ActionCreator from 'helpers/ActionCreator';

const actionCreator = new ActionCreator('Search');

export default {
  /**
   * action into the reducer after it failed
   * @param {Object} payload contains the errors object after
   * requests failed
   */
  SET_ERRORS: (payload) => actionCreator.create(SET_ERRORS, payload),

  /** Action to search a list of candidates that will be call in the API
   * @param {String}  value contains the candidate to search
   */
  SEARCH_CANDIDATES: (value) => actionCreator.create(SEARCH_CANDIDATES, value),

  /**
   * action into the reducer after this was successfully uploaded
   * @param {candidates} candidates contains the candidates found
   * @param {number} Candidate.id is a identifier of a candidate
   * @param {string} Candidate.fullName is the name and lastName of a candidate
   */
  SET_SEARCH_CANDIDATES: (candidates) =>
    actionCreator.create(SET_SEARCH_CANDIDATES, candidates),
};
