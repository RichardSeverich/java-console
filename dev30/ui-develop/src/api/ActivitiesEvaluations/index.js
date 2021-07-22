import environment from 'app/environment';
import api from 'helpers/apiFactory';

/**
 * Function that makes a request to the API and return the response
 * of the result of that request
 * @param {File} file contains the file data to be upload
 */
export async function uploadActivitiesEvaluations(file) {
  const baseInstanceAxios = api.fileAxiosFactory();
  const response = await baseInstanceAxios.post(
    `${environment.RESULT_EVALUATIONS}${environment.UPLOAD}`,
    file
  );
  return response;
}

/**
 * function that get all evaluations result from the api using Axios
 */
export async function getEvaluationsResult(candidateId) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(
    `${environment.CANDIDATES}/${candidateId}${environment.RESULT_EVALUATIONS}`
  );
  return response.data;
}

export default {
  uploadActivitiesEvaluations,
  getEvaluationsResult,
};
