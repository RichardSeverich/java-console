import api from 'helpers/apiFactory';
import environment from 'app/environment';

/**
 * Api function that upload candidates from the given file,
 * use axios to comunicates with the real API, makes a request to it.
 * @param {File} file contains the data to upload
 */
export async function uploadCandidates(file) {
  const baseInstanceAxios = api.fileAxiosFactory();
  const response = await baseInstanceAxios.post(
    `${environment.CANDIDATES}${environment.UPLOAD}`,
    file
  );
  return response;
}

/**
 * function that get all candidates from the api using Axios
 * @param {number} programId is a identify of a program
 */
export async function getCandidates(programId) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(
    `${environment.PROGRAMS}/${programId}${environment.CANDIDATES}`
  );
  return response.data;
}

/**
 * Function for fetching a specific candidate from an api
 * @param {number} id is the identifier of the candidate to fetch data
 */
export async function getCandidate(id) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(
    `${environment.CANDIDATES}/${id}`
  );
  return response.data;
}

/**
 * function that get all programs where a candidate was registered
 * @param {number} idCandidate is the identifier of the candidate to get programs
 */
export async function getCandidatePrograms(idCandidate) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(
    `${environment.CANDIDATES}/${idCandidate}${environment.HISTORY}`
  );
  return response.data;
}

export default {
  uploadCandidates,
  getCandidates,
  getCandidate,
  getCandidatePrograms,
};
