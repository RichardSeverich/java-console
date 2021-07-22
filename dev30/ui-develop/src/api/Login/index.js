import environment from 'app/environment';
import apiFactory from 'helpers/apiFactory';
import ErrorMapper from 'app/mappers/ErrorMapper';

/**
 * Login function that use axios to comunicates with the API
 * @param {Object} user user that will be passed to the API request
 * @param {String} user.email email of user that will be passed to the API request
 * @param {String} user.password password of user that will be passed to the API request
 */
export async function login(user) {
  const baseInstanceAxios = apiFactory.emptyAxiosFactory();
  try {
    const response = await baseInstanceAxios.post(
      `${environment.AUTH}${environment.LOGIN}`,
      {
        email: user.email,
        password: user.password,
      }
    );
    return response.data;
  } catch (error) {
    const loginError = {
      code: error.response.status,
      message: error.response.data.message,
      token: error.response.data.token,
    };
    throw loginError;
  }
}

/**
 * ChangePassword function that use axios to communicates with the API
 * @param {Object} user user that will be passed to the API request
 * @param {String} user.email email of user that will be passed to the API request
 * @param {String} user.currentPassword default password
 * of user that will be passed to the API request
 * @param {String} user.newPassword new password of user that will be passed to the API request
 * @param {String} user.confirmPassword confirm password
 * of user that will be passed to the API request
 * @param {string} temporalToken of user to change of password
 */
export async function changePassword(user, temporalToken) {
  const baseInstanceAxios = apiFactory.emptyAxiosFactory();
  try {
    const response = await baseInstanceAxios.patch(
      `${environment.USERS}`,
      {
        email: user.email,
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
        confirmPassword: user.confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${temporalToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new ErrorMapper(error);
  }
}

export default {
  login,
  changePassword,
};
