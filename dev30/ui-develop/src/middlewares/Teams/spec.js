import api from 'api/Teams';
import teamsMiddleware from 'middlewares/Teams';
import { IMPORT_TEAMS, SET_IMPORT_TEAMS, SET_ERRORS } from 'app/constant/Teams';

jest.mock('api/Teams');

describe('teams middleware tests', () => {
  it('should import teams when IMPORT_TEAMS function was called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const formData = new FormData();
    const action = {
      type: `@Teams/${IMPORT_TEAMS}`,
      payload: formData,
    };
    api.importTeams.mockImplementation(() => {
      return Promise.resolve({
        message: 'success',
        total: 5,
        saved: 4,
        failed: 1,
      });
    });
    await teamsMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: `@Teams/${SET_IMPORT_TEAMS}`,
          payload: {
            message: 'success',
            total: 5,
            saved: 4,
            failed: 1,
          },
        },
      ],
      [
        {
          type: `@Teams/${SET_ERRORS}`,
          payload: {
            import: {
              message: '',
              code: '',
            },
          },
        },
      ],
    ]);
  });

  it('should throw error when importTeams param is an empty object', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Teams/${IMPORT_TEAMS}`,
      payload: {},
    };
    const dataMock = {
      code: '400',
      message: 'empty',
    };
    api.importTeams.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    await teamsMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: `@Teams/${SET_ERRORS}`,
          payload: {
            import: {
              code: '400',
              message: 'empty',
            },
          },
        },
      ],
      [
        {
          type: `@Teams/${SET_IMPORT_TEAMS}`,
          payload: {
            message: '',
            total: '',
            saved: '',
            failed: '',
          },
        },
      ],
    ]);
  });
});
