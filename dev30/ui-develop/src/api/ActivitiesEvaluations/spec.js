import apiFactory from 'helpers/apiFactory';
import activitiesEvaluations from 'api/ActivitiesEvaluations';

jest.mock('helpers/apiFactory');

describe('activities Evaluations tests', () => {
  it(`should be equals the response object when UPLOAD_ACTIVITIES_EVALUATIONS
    action was called succesfully`, async () => {
    expect.assertions(4);
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              message: 'Successfully uploaded file',
              total: '10',
              saved: '10',
              failed: '0',
            },
          }),
      };
    });
    const formData = new FormData();
    const response = await activitiesEvaluations.uploadActivitiesEvaluations(
      formData
    );
    expect(response.data.message).toStrictEqual('Successfully uploaded file');
    expect(response.data.total).toStrictEqual('10');
    expect(response.data.saved).toStrictEqual('10');
    expect(response.data.failed).toStrictEqual('0');
  });

  it('should get list of evaluations result when GET_EVALUATIONS_RESULT action was called', async () => {
    expect.assertions(1);
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
        activity: 'Charla UMSS',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
      {
        id: '3',
        program: 'DEV-30',
        activity: 'Charla UMSS',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () =>
          Promise.resolve({
            data: resultsEvaluationsMockList,
          }),
      };
    });
    const response = await activitiesEvaluations.getEvaluationsResult(1);
    expect(response).toStrictEqual(resultsEvaluationsMockList);
  });
});
