/**
 * Mapper Error used to manage responses and API errors forbidden
 */
export default class ErrorForbidden {
  constructor(code = '', message = '') {
    this.code = code;
    this.message = message;
  }
}
