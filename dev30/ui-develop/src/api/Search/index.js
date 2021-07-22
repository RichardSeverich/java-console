import api from 'helpers/apiFactory';
import environment from 'app/environment';

/**
 * function that search all the candidates from the api
 * @param {String} value.keyWord contains the keyword to search a candidate
 */
export async function searchCandidates(value) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(
    `${environment.CANDIDATES}${environment.SEARCH}/${value}`
  );
  return response;
}

export default {
  searchCandidates,
};
