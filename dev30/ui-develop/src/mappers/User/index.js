/**
 * Mapper user that will handle the response and the request to the API
 */
export default class User {
  constructor(email, password) {
    this.id = undefined;
    this.email = email;
    this.password = password;
  }
}
