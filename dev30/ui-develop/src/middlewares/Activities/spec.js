import api from 'api/Activities';
import activitiesMiddleware from 'middlewares/Activities';

jest.mock('api/Activities');

describe('activities middleware tests', () => {
  it('should import activities succesfully when importActivities function was called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const formData = new FormData();
    const action = {
      type: '@Activities/UPLOAD_ACTIVITIES',
      payload: formData,
    };
    api.uploadActivities.mockImplementation(() => {
      return Promise.resolve({
        message: 'Succesfuly uploaded',
        total: '5',
        saved: '5',
        failed: '0',
      });
    });
    await activitiesMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: '@Activities/SET_UPLOADED_ACTIVITIES',
          payload: undefined,
        },
      ],
      [
        {
          type: '@Activities/SET_ERRORS',
          payload: {
            uploadActivities: {
              message: '',
              code: '',
            },
          },
        },
      ],
    ]);
  });

  it('should throw error when importActivities action param is an empty object', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@Activities/UPLOAD_ACTIVITIES',
      payload: {},
    };
    api.uploadActivities.mockImplementation(() => {
      return Promise.reject(
        new Error({
          code: '400',
          message: 'Please upload a file',
        })
      );
    });
    await activitiesMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: '@Activities/SET_ERRORS',
          payload: {
            uploadActivities: new Error({
              message: 'Please upload a file',
              code: '400',
            }),
          },
        },
      ],
      [
        {
          type: '@Activities/SET_UPLOADED_ACTIVITIES',
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

  it('should break the middleware when INVALID_ACTION action is called', async () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@Activities/INVALID_ACTION',
    };
    await activitiesMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
