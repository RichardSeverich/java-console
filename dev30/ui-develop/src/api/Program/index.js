import environment from 'app/environment';
import api from 'helpers/apiFactory';

/**
 * GetAll programs function that use axios to comunicates with the API
 */
export async function getAll() {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(`${environment.PROGRAMS}`);
  return response.data;
}

/**
 * ImportPrograms function what use axios to comunicates with teh API,
 * makes a request to import programs with data in csv type, throw error
 * if the request response has errors
 * @param {Object} data data that contains the csv file to send
 */
export async function importPrograms(data) {
  const baseInstanceAxios = api.fileAxiosFactory();
  const response = await baseInstanceAxios.post(
    `${environment.PROGRAMS}${environment.UPLOAD}`,
    data
  );
  return response.data;
}

/**
 * Get a program function getProgram that use axios to communicates with the API
 */
export async function getProgram(id) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(`${environment.PROGRAMS}/${id}`);
  const program = {
    id: response.data.id,
    name: `${response.data.programType} ${response.data.programOrder}`,
    description: response.data.description,
    startDate: response.data.startDate,
    endDate: response.data.endDate,
  };

  return program;
}

/**
 * Update program information function that uses axios to communicate with the API
 */
export async function updateProgram(id, program) {
  const baseAxiosInstance = api.axiosFactory();
  const response = await baseAxiosInstance.put(
    `${environment.PROGRAMS}/${id}`,
    program
  );
  return response.data;
}

export default {
  getAll,
  importPrograms,
  getProgram,
  updateProgram,
};
