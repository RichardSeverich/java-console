import loginMiddleware from 'middlewares/Login';
import { LOGIN, LOGOUT, SET_ERRORS, CHANGE_PASSWORD } from 'app/constant/Login';
import authService from 'app/services/AuthService';
import cookiesService from 'app/services/CookieService';
import api from 'api/Login';

jest.mock('app/services/AuthService');
jest.mock('app/services/CookieService');
jest.mock('api/Login');

describe('login middleware tests', () => {
  it('should login the user succesfully when LOGIN action is called', async () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${LOGIN}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        password: 'password',
      },
    };
    api.login.mockImplementation((user) => {
      return Promise.resolve(user);
    });
    cookiesService.saveCookie.mockImplementation((value) => value);
    authService.decodeToken.mockImplementation(() => 'saved token decoded');
    loginMiddleware(store)(next)(action);
    expect(api.login).toHaveBeenCalledTimes(1);
  });

  it('should logout the user when LOGOUT action is called', async () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${LOGOUT}`,
    };
    cookiesService.removeCookie.mockImplementation(() => 'removed');
    loginMiddleware(store)(next)(action);
    expect(cookiesService.removeCookie).toHaveBeenCalledTimes(1);
  });

  it('should break middleware when INVALID_ACTION action is called', () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@Auth/INVALID_ACTION',
    };
    loginMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should login succesfully when LOGIN action is called', async () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${LOGIN}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        password: 'sample',
      },
    };
    cookiesService.saveCookie.mockImplementation((value) => value);
    authService.decodeToken.mockImplementation(() => 'saved token decoded');
    api.login.mockImplementation((user) => {
      return Promise.resolve('token');
    });
    await loginMiddleware(store)(next)(action);
    expect(api.login).toHaveBeenCalledTimes(1);
  });

  it('should logout succesfully when LOGUOT action is called', async () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${LOGOUT}`,
    };
    cookiesService.removeCookie.mockImplementation(() => 'removed');
    await loginMiddleware(store)(next)(action);
    expect(cookiesService.removeCookie).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when a user first login', async () => {
    expect.assertions(2);
    const next = jest.fn();
    const store = {
      dispatch: jest.fn(),
    };
    const action = {
      type: `@Auth/${LOGIN}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        password: 'password',
      },
    };
    api.login.mockImplementation(() => {
      return Promise.reject(
        new Error({
          code: 426,
          message: '',
          token: 'token',
        })
      );
    });
    cookiesService.saveCookie.mockImplementation((key, value) => value);
    cookiesService.getCookie.mockImplementation((key) => 'token');
    await loginMiddleware(store)(next)(action);
    expect(cookiesService.saveCookie).toHaveBeenCalledTimes(1);
    expect(cookiesService.getCookie('temporal_token')).toBe('token');
  });

  it('should change password successfully when CHANGE_PASSWORD action is called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${CHANGE_PASSWORD}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        currentPassword: 'password',
        newPassword: 'newPassword',
        confirmPassword: 'newPassword',
      },
    };
    api.changePassword.mockImplementation(() => {});
    cookiesService.getCookie.mockImplementation((key) => 'token');
    cookiesService.removeCookie.mockImplementation((key) => {});
    await loginMiddleware(store)(next)(action);
    expect(cookiesService.getCookie).toHaveBeenCalledTimes(1);
    expect(cookiesService.removeCookie).toHaveBeenCalledTimes(1);
  });

  it('should throw error when login function is called with empty payload request', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${LOGIN}`,
      payload: {},
    };
    const dataMock = {
      code: '403',
      message: 'empty credentials',
    };

    api.login.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    await loginMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Auth/${SET_ERRORS}`,
      payload: {
        login: {
          code: '403',
          message: 'empty credentials',
        },
      },
    });
  });

  it('should throw an error when a user first login 2', async () => {
    expect.assertions(1);
    const next = jest.fn();
    const store = {
      dispatch: jest.fn(),
    };
    const action = {
      type: `@Auth/${LOGIN}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        password: 'password',
      },
    };
    const dataMock = {
      code: '426',
      message: '',
      token: 'token',
    };
    api.login.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    cookiesService.saveCookie.mockImplementation((key, value) => value);
    await loginMiddleware(store)(next)(action);
    console.log(cookiesService.saveCookie.mock.calls);
    expect(cookiesService.saveCookie.mock.calls).toEqual([
      ['temporal_token', 'token'],
    ]);
  });

  it('should change password successfully when CHANGE_PASSWORD action is called 2', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${CHANGE_PASSWORD}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        currentPassword: 'password',
        newPassword: 'newPassword-123',
        confirmPassword: 'newPassword-123',
      },
    };
    api.changePassword.mockImplementation(() => {});
    cookiesService.getCookie.mockImplementation((key) => 'token');
    cookiesService.removeCookie.mockImplementation((key) => {});
    await loginMiddleware(store)(next)(action);
    expect(cookiesService.getCookie.mock.calls).toEqual([['temporal_token']]);
    expect(cookiesService.removeCookie.mock.calls).toEqual([
      ['temporal_token'],
    ]);
  });

  it('should throw an error when the data has errors when CHANGE_PASSWORD action is called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${CHANGE_PASSWORD}`,
      payload: {
        email: 'sample@outlook.org',
        currentPassword: 'password',
        newPassword: 'password',
        confirmPassword: 'password',
      },
    };
    const dataMock = {
      code: '400',
      message: 'incorrect password',
    };
    api.changePassword.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    cookiesService.getCookie.mockImplementation((key) => 'token');
    await loginMiddleware(store)(next)(action);
    expect(cookiesService.getCookie.mock.calls).toEqual([['temporal_token']]);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Auth/${SET_ERRORS}`,
      payload: {
        changePassword: {
          code: '400',
          message: 'incorrect password',
        },
      },
    });
  });

  it('should throw an error when a user first login 3', async () => {
    expect.assertions(1);
    const next = jest.fn();
    const store = {
      dispatch: jest.fn(),
    };
    const action = {
      type: `@Auth/${LOGIN}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        password: 'password',
      },
    };
    const dataMock = {
      code: 426,
      message: '',
      token: 'token',
    };
    api.login.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    cookiesService.saveCookie.mockImplementation((key, value) => value);
    await loginMiddleware(store)(next)(action);
    expect(cookiesService.saveCookie.mock.calls).toEqual([
      ['temporal_token', 'token'],
    ]);
  });

  it('should change password successfully when CHANGE_PASSWORD action is called 3', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Auth/${CHANGE_PASSWORD}`,
      payload: {
        email: 'sample@fundacion-jala.org',
        currentPassword: 'password',
        newPassword: 'newPassword-123',
        confirmPassword: 'newPassword-123',
      },
    };
    api.changePassword.mockImplementation(() => {});
    cookiesService.getCookie.mockImplementation((key) => 'token');
    cookiesService.removeCookie.mockImplementation((key) => {});
    await loginMiddleware(store)(next)(action);
    expect(cookiesService.getCookie.mock.calls).toEqual([['temporal_token']]);
    expect(cookiesService.removeCookie.mock.calls).toEqual([
      ['temporal_token'],
    ]);
  });
});
