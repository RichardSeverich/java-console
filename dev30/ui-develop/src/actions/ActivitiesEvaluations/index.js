import {
  CLEAR_MESSAGES,
  SET_ERRORS,
  SET_UPLOADED_ACTIVITIES_EVALUATIONS,
  UPLOAD_ACTIVITIES_EVALUATIONS,
  GET_EVALUATIONS_RESULT,
  SET_EVALUATIONS_RESULT,
} from 'app/constant/ActivitiesEvaluations';

import ActionCreator from 'helpers/ActionCreator';

const actionCreator = new ActionCreator('ActivitiesEvaluations');

export default {
  /**
   * Action to CLEAR_MESSAGES to the reducer, this action will be called
   * when container import activities is dismount.
   */
  CLEAR_MESSAGES: () => actionCreator.create(CLEAR_MESSAGES),

  /**
   * Action to set the result of the UPLOAD_ACTIVITIES_EVALUATIONS
   * action into the reducer after this failed
   * @param {Object} payload contains the errors object
   */
  SET_ERRORS: (payload) => actionCreator.create(SET_ERRORS, payload),

  /**
   * Action to set the result of the UPLOAD_ACTIVITIES_EVALUATIONS
   * action into the reducer after this was successfully
   * @param {Object} payload that contains the result of import
   */
  SET_UPLOADED_ACTIVITIES_EVALUATIONS: (payload) =>
    actionCreator.create(SET_UPLOADED_ACTIVITIES_EVALUATIONS, payload),

  /**
   * Action to UPLOAD ACTIVITIES EVALUATIONS to the api
   * @param {File} payload payload that contains the file to be upload
   */
  UPLOAD_ACTIVITIES_EVALUATIONS: (payload) =>
    actionCreator.create(UPLOAD_ACTIVITIES_EVALUATIONS, payload),

  /**
   * Action to GET EVALUATIONS RESULT to the api
   * @param {id} payload payload that contains the id of a candidate
   */
  GET_EVALUATIONS_RESULT: (candidateId) =>
    actionCreator.create(GET_EVALUATIONS_RESULT, candidateId),

  /**
   * Action to set the result of the GET_CANDIDATES
   * action into the reducer after this was successfully uploaded
   * @param {Result[]} results contain all evaluations results of the candidate
   ** @param {number} EvaluationResult.id is a identifier of a result
   ** @param {string} EvaluationResult.activity is the activity of the result
   ** @param {string} EvaluationResult.program is the program of the result
   ** @param {string} EvaluationResult.score is the score obtained of the result
   ** @param {string} EvaluationResult.setEvaluation is the set to which result belongs
   */
  SET_EVALUATIONS_RESULT: (payload) =>
    actionCreator.create(SET_EVALUATIONS_RESULT, payload),
};
