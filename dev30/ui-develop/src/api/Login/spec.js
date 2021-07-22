import { changePassword, login } from 'api/Login';
import apiFactory from 'helpers/apiFactory';

jest.mock('helpers/apiFactory');

describe('api login test', () => {
  it('should get response when calls the login function succesfully', async () => {
    expect.assertions(1);
    apiFactory.emptyAxiosFactory.mockImplementation(() => {
      return {
        post: () => Promise.resolve({ data: 'token' }),
      };
    });
    const user = {
      email: 'example@fundacion-jala.org',
      password: 'alt.12345',
    };
    const response = await login(user);
    expect(response).toStrictEqual('token');
  });

  it('should fails the login with an error when invalid axios instance was sent', async () => {
    expect.assertions(2);
    apiFactory.emptyAxiosFactory.mockImplementation(() => {
      return { post: () => Promise.reject(new Error('user is not defined')) };
    });
    try {
      await login(user);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toStrictEqual('user is not defined');
    }
  });

  it('should throw error when credentials are invalid', async () => {
    expect.assertions(2);
    const user = {
      email: 'example@fundacion-jala.org',
      password: 'example',
    };
    const dataMock = {
      response: {
        status: '403',
        data: {
          message: 'forbidden',
        },
      },
    };
    apiFactory.emptyAxiosFactory.mockImplementation(() => {
      return {
        post: () => Promise.reject(dataMock),
      };
    });
    try {
      await login(user);
    } catch (error) {
      expect(error.code).toStrictEqual('403');
      expect(error.message).toStrictEqual('forbidden');
    }
  });

  it('should throw error when invalid login request is called', async () => {
    expect.assertions(2);
    const user = {
      email: 'example@fundacion-jala.com',
      password: 'example',
    };
    const dataMock = {
      response: {
        status: '403',
        data: {
          message: 'forbidden',
        },
      },
    };
    apiFactory.emptyAxiosFactory.mockImplementation(() => {
      return {
        post: () => Promise.reject(dataMock),
      };
    });
    try {
      await login(user);
    } catch (error) {
      expect(error.code).toStrictEqual('403');
      expect(error.message).toStrictEqual('forbidden');
    }
  });

  it('should throw an error when an user login for the first time', async () => {
    expect.assertions(2);
    const user = {
      email: 'example@fundacion-jala.com',
      password: 'example',
    };
    const dataMock = {
      response: {
        status: '426',
        data: {
          message: 'token',
        },
      },
    };
    apiFactory.emptyAxiosFactory.mockImplementation(() => {
      return {
        post: () => Promise.reject(dataMock),
      };
    });
    try {
      await login(user);
    } catch (error) {
      expect(error.code).toStrictEqual('426');
      expect(error.message).toStrictEqual('token');
    }
  });

  it('should get response when calls the change password function successfully', async () => {
    expect.assertions(1);
    apiFactory.emptyAxiosFactory.mockImplementation(() => {
      return {
        patch: () =>
          Promise.resolve({
            response: {
              status: '200',
            },
          }),
      };
    });
    const user = {
      email: 'example@fundacion-jala.com',
      currentPassword: 'example',
      newPassword: 'newExample',
      confirmPassword: 'newExample',
    };
    const { response } = await changePassword(user, 'token');
    expect(response.status).toStrictEqual('200');
  });

  it('should throw error when change password request is called with invalid data', async () => {
    expect.assertions(2);
    const dataMock = {
      response: {
        status: '400',
        data: {
          message: '',
        },
      },
    };
    apiFactory.emptyAxiosFactory.mockImplementation(() => {
      return {
        patch: () => Promise.reject(dataMock),
      };
    });
    const user = {
      email: 'name.lastname@fundacion-jala.com',
      currentPassword: 'password-123',
      newPassword: 'newpassword*123^',
      confirmPassword: 'newpassword*123^',
    };
    try {
      await changePassword(user, 'token');
    } catch (error) {
      expect(error.code).toStrictEqual('400');
      expect(error.message).toStrictEqual('');
    }
  });
});
