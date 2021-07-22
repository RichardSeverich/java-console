import environment from 'app/environment';
import api from 'helpers/apiFactory';

/**
 * Upload Activities from the given file, use axios to communicates
 * with the API, makes a request and return the response of this
 * @param {File} file file that contains the data to store
 */
export async function uploadActivities(file) {
  const baseInstanceAxios = api.fileAxiosFactory();
  const response = await baseInstanceAxios.post(
    `${environment.ACTIVITIES}${environment.UPLOAD}`,
    file
  );
  return response;
}

/**
 * function that get all activities from the api using Axios
 */
export async function getActivities(id) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(
    `${environment.PROGRAMS}/${id}${environment.ACTIVITIES}`
  );
  return response.data;
}

export default {
  uploadActivities,
  getActivities,
};
