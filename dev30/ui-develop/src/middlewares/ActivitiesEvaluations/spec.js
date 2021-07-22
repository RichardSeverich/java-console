import api from 'api/ActivitiesEvaluations';
import middleware from 'middlewares/ActivitiesEvaluations';

jest.mock('api/ActivitiesEvaluations');

describe('activities Evaluations middleware tests', () => {
  it('should import activities evaluations succesfully when importActivitiesEvaluations was called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const formData = new FormData();
    const action = {
      type: '@ActivitiesEvaluations/UPLOAD_ACTIVITIES_EVALUATIONS',
      payload: formData,
    };
    api.uploadActivitiesEvaluations.mockImplementation(() => {
      return Promise.resolve({
        message: 'Succesfuly uploaded',
        total: '10',
        saved: '10',
        failed: '0',
      });
    });
    await middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: '@ActivitiesEvaluations/SET_UPLOADED_ACTIVITIES_EVALUATIONS',
        },
      ],
      [
        {
          type: '@ActivitiesEvaluations/SET_ERRORS',
          payload: {
            uploadActivitiesEvaluations: {
              message: '',
              code: '',
            },
          },
        },
      ],
    ]);
  });

  it('should throw error when importActivitiesEvaluations action param is an empty object', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@ActivitiesEvaluations/UPLOAD_ACTIVITIES_EVALUATIONS',
      payload: {},
    };
    api.uploadActivitiesEvaluations.mockImplementation(() => {
      return Promise.reject(
        new Error({
          code: '400',
          message: 'Please upload a file',
        })
      );
    });
    await middleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: '@ActivitiesEvaluations/SET_ERRORS',
          payload: {
            uploadActivitiesEvaluations: new Error({
              message: 'Please upload a file',
              code: '400',
            }),
          },
        },
      ],
      [
        {
          type: '@ActivitiesEvaluations/SET_UPLOADED_ACTIVITIES_EVALUATIONS',
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
      type: '@ActivitiesEvaluations/INVALID_ACTION',
    };
    await middleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should get result evaluations successfully when GET_EVALUATIONS_RESULT action was called', async () => {
    expect.assertions(2);
    const resultsEvaluationsMockList = [
      {
        id: '1',
        program: 'DEV-30',
        activity: 'Charla UMSS',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
      {
        id: '2',
        program: 'DEV-30',
        activity: 'Entrevista recursos humanos',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
      {
        id: '3',
        program: 'DEV-30',
        activity: 'Charla Fundacion',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
    ];

    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@ActivitiesEvaluations/GET_EVALUATIONS_RESULT',
      payload: 21,
    };
    api.getEvaluationsResult.mockImplementation(() => {
      return Promise.resolve(resultsEvaluationsMockList);
    });
    await middleware(store)(next)(action);
    expect(api.getEvaluationsResult).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: '@ActivitiesEvaluations/SET_EVALUATIONS_RESULT',
      payload: resultsEvaluationsMockList,
    });
  });
});
