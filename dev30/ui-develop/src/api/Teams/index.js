import environment from 'app/environment';
import api from 'helpers/apiFactory';

/**
 * importTeams function what use axios to comunicates with the API,
 * makes a request to import teams with data in file type, throw error
 * if the request response has errors
 * @param {Object} data data that contains the file to send
 */
export async function importTeams(data) {
  const baseInstanceAxios = api.fileAxiosFactory();

  const response = await baseInstanceAxios.post(
    `${environment.TEAMS}${environment.UPLOAD}`,
    data
  );
  return response.data;
}

export default {
  importTeams,
};
