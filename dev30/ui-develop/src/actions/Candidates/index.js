import {
  CLEAR_MESSAGES,
  GET_CANDIDATES,
  FETCH_CANDIDATE,
  SET_CANDIDATES,
  SET_ERRORS,
  SET_SELECTED_CANDIDATE,
  SET_UPLOADED_CANDIDATES,
  UPLOAD_CANDIDATES,
  GET_CANDIDATE_PROGRAMS,
  SET_CANDIDATE_PROGRAMS,
} from 'app/constant/Candidates';

import ActionCreator from 'helpers/ActionCreator';

const actionCreator = new ActionCreator('Candidates');

export default {
  /**
   * Action to CLEAR MESSAGES of import result to the reducer,
   * this action will be called when container import candidates is dismount.
   */
  CLEAR_MESSAGES: () => actionCreator.create(CLEAR_MESSAGES),

  /**
   * Action to UPLOAD CANDIDATES that will be call in the API
   * @param {Object} payload contains the file to be uploaded
   */
  UPLOAD_CANDIDATES: (payload) =>
    actionCreator.create(UPLOAD_CANDIDATES, payload),

  /**
   * Action to set the result of the UPLOAD_CANDIDATES
   * action into the reducer after this was successfully uploaded
   * @param {Object} payload contains the response of the successfull request
   */
  SET_UPLOADED_CANDIDATES: (payload) =>
    actionCreator.create(SET_UPLOADED_CANDIDATES, payload),

  /**
   * Action to GET_CANDIDATES that will be call in the API
   * @param {number} programId is the identifier of a program
   */
  GET_CANDIDATES: (programId) =>
    actionCreator.create(GET_CANDIDATES, programId),

  /**
   * Action to set the result of the GET_CANDIDATES
   * action into the reducer after this was successfully uploaded
   * @param {Array<Candidate>} candidates contain all candidates to store in the store
   * @param {number} Candidate.id is a identifier of a candidate
   * @param {string} Candidate.fullName is the name and lastName of a candidate
   * @param {string} Candidate.email is the email of a candidate
   * @param {string} Candidate.cellphone is the cellPhone of a candidate
   * @param {string} Candidate.lastActivity is the name of the last activity
   * @param {string} Candidate.status is the state of a candidate
   */
  SET_CANDIDATES: (candidates) =>
    actionCreator.create(SET_CANDIDATES, candidates),

  /**
   * Action to set the result of the UPLOAD_CANDIDATES and GET_CANDIDATES
   * action into the reducer after it failed
   * @param {Object} payload contains the errors object after
   * requests failed
   */
  SET_ERRORS: (payload) => actionCreator.create(SET_ERRORS, payload),

  /**
   * Action to set the selecte candidate
   * @param {number} candidateId is the identifier of the candidate
   */
  SET_SELECTED_CANDIDATE: (candidate) =>
    actionCreator.create(SET_SELECTED_CANDIDATE, candidate),

  /**
   * Action to fetch a specific candidate
   * @param {number} candidateId is the identifier of the candidate
   */
  FETCH_CANDIDATE: (candidateId) =>
    actionCreator.create(FETCH_CANDIDATE, candidateId),

  /**
   * Action to GET CANDIDATE PROGRAMS to the api
   * @param {id} payload payload that contains the id of a candidate
   */
  GET_CANDIDATE_PROGRAMS: (candidateId) =>
    actionCreator.create(GET_CANDIDATE_PROGRAMS, candidateId),

  /**
   * Action to set the result of the GET_CANDIDATE_PROGRAMS
   * action into the reducer after this was successfully uploaded
   * @param {CandidatePrograms[]} result contain all programs related to a candidate
   ** @param {number} CandidatePrograms.id is a identifier of a result
   ** @param {string} CandidatePrograms.program is the name of program
   ** @param {string} CandidatePrograms.status is the status of the candidate for a program
   */
  SET_CANDIDATE_PROGRAMS: (payload) =>
    actionCreator.create(SET_CANDIDATE_PROGRAMS, payload),
};
