import cookies from 'js-cookie';

/**
 * SaveCookie function that stores a cookie in the Cookies
 * @param {String} key key of the cookie
 * @param {String} value value of the given key
 */
function saveCookie(key, value) {
  cookies.set(key, value);
}

/**
 * RemoveCookie function that removes a cookie given the key
 * @param {String} key key of the cookie saved
 */
function removeCookie(key) {
  cookies.remove(key);
}

/**
 * GetCookie function that returns a cookie given the key
 * @param {String} key key of the cookie
 */
function getCookie(key) {
  return cookies.get(key);
}

export default {
  saveCookie,
  removeCookie,
  getCookie,
};
