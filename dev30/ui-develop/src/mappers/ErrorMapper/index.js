/**
 * Mapper Error used to manage responses and API errors
 */
export default class ErrorMapper {
  constructor(error) {
    this.code = error.response.status;
    this.message = error.response.data.message;
  }
}
