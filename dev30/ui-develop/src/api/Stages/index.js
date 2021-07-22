import environment from 'app/environment';
import api from 'helpers/apiFactory';
import ProgramStage from 'app/mappers/ProgramStage';

/**
 * ImportStages function that use axios to comunicates with the api,
 * makes a request to import stages with data in json type, throw error
 * if the request response has errors
 * @param {Object} data data that contains the json file to send
 */
export async function importStages(data) {
  const baseInstanceAxios = api.fileAxiosFactory();
  const response = await baseInstanceAxios.post(
    `${environment.STAGES}${environment.UPLOAD}`,
    data
  );
  return response.data;
}

/**
 * Get all program's stages that comunicates with the api,
 * makes a request to get all program's stages, and throws an
 * error if the response of that request returns errors
 * @param {Object} data that contains program id for retrieving all stages
 */
async function getProgramStages(data) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.get(
    `${environment.PROGRAMS}/${data}${environment.STAGES}`
  );
  return response.data;
}

/**
 * Update all stages of a program to communicate with the api.
 * * @param {ProgramStage[]} stages are the updated stages of a program.
 * * * @param {number} ProgramStage.id is the identifier of the stage
 * * * @param {string} ProgramStage.name is the name of the stage
 * * * @param {number} ProgramStage.order is a unique number of the stage
 * * * @param {number} ProgramStage.startDate is a unique date of the stage
 */
async function updateProgramStages(stages) {
  const baseInstanceAxios = api.axiosFactory();
  const response = await baseInstanceAxios.put(`${environment.STAGES}`, stages);
  const programStages = response.data.map((item) => {
    return new ProgramStage(item.id, item.order, item.name, item.startDate);
  });
  return programStages;
}

export default {
  importStages,
  getProgramStages,
  updateProgramStages,
};
