import api from 'api/User';
import userMiddleware from 'middlewares/User';
import { CREATED, SET_RESPONSE, ERROR } from 'app/constant/User';

jest.mock('api/User');

describe('user middleware tests', () => {
  it('should import create user file succesfully when postCreateUser function was called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const formData = new FormData();
    const action = {
      type: `@User/${CREATED}`,
      payload: formData,
    };
    api.createUserFileCSV.mockImplementation(() => {
      return Promise.resolve({
        rejectedAccounts: '2',
        successfulAccounts: '2',
      });
    });
    await userMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@User/${SET_RESPONSE}`,
      payload: {
        rejectedAccounts: '2',
        successfulAccounts: '2',
      },
    });
  });

  it('should throw error when import create user file param is an empty object', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@User/${CREATED}`,
      payload: {},
    };
    const dataMock = {
      code: '400',
      message: 'empty',
    };
    api.createUserFileCSV.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    await userMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@User/${ERROR}`,
      payload: {
        code: '400',
        message: 'empty',
      },
    });
  });
});
