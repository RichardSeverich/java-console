import jwtDecode from 'jwt-decode';

/**
 * DecodeToken function that decodes the token given
 * @param {String} token token that will be  decoded
 */
function decodeToken(token) {
  return jwtDecode(token);
}

export default {
  decodeToken,
};
