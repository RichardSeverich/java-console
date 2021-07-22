/**
 * Mapper Error used to manage responses and API errors
 */
export default class ErrorNotFound {
  constructor(code = '', message = '') {
    this.code = code;
    this.message = message;
  }
}
