import environment from 'app/environment';
import api from 'helpers/apiFactory';

/**
 * Login function that use axios to comunicates with the API url users/csv
 * @param {File} file file that contain users will be passed to the API request
 */

export async function createUserFileCSV(file) {
  const axios = api.fileAxiosFactory();
  const response = await axios.post(
    `${environment.USERS}${environment.UPLOAD}`,
    file
  );
  return response.data;
}
export default {
  createUserFileCSV,
};
