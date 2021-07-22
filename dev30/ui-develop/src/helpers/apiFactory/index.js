import axios from 'axios';
import environment from 'app/environment';
import CookiesService from 'app/services/CookieService';
import ErrorMapper from 'app/mappers/ErrorMapper';
/**
 * Function that returns the base instance of axios that
 * will be use in each API action without headers
 */
export function emptyAxiosFactory() {
  return axios.create({
    baseURL: environment.URL,
    headers: {},
  });
}

/**
 * Function that returns the base instance of axios
 * that will be use in each API action with headers
 * like authorization, etc
 */
export function axiosFactory() {
  const token = CookiesService.getCookie('token');
  const authorization = token ? `Bearer ${token}` : token;
  const instance = axios.create({
    baseURL: environment.URL,
    headers: {
      Authorization: authorization,
    },
  });
  instance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      return new Promise((resolve, reject) => {
        reject(new ErrorMapper(error));
      });
    }
  );
  return instance;
}

/**
 * Function that returns a base instance axios that will
 * be used in each API action that needs to send file types
 * to the API
 */

/**
 * interceptors of errors that map an error arrives from the API and is placed
 * in code and message format.
 */
const fileAxiosFactory = () => {
  const token = CookiesService.getCookie('token');
  const authorization = token ? `Bearer ${token}` : token;
  const instance = axios.create({
    baseURL: environment.URL,
    headers: {
      Authorization: authorization,
      'Content-type': 'multipart/form-data',
    },
  });
  instance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      return new Promise((resolve, reject) => {
        reject(new ErrorMapper(error));
      });
    }
  );
  return instance;
};

export default {
  axiosFactory,
  emptyAxiosFactory,
  fileAxiosFactory,
};
