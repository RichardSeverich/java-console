import apiFactory from 'helpers/apiFactory';
import activities from 'api/Activities';
import Activity from 'app/mappers/Activity';
import ErrorForbidden from 'app/mappers/ErrorForbidden';

jest.mock('helpers/apiFactory');

describe('activities api test', () => {
  it('should get the response object when IMPORT_ACTIVITIES action was called succesfully', async () => {
    expect.assertions(4);
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              message: 'Successfully uploaded file',
              total: '5',
              saved: '5',
              failed: '0',
            },
          }),
      };
    });
    const formData = new FormData();
    const response = await activities.uploadActivities(formData);
    expect(response.data.message).toStrictEqual('Successfully uploaded file');
    expect(response.data.total).toStrictEqual('5');
    expect(response.data.saved).toStrictEqual('5');
    expect(response.data.failed).toStrictEqual('0');
  });

  it('should get list of activities when GET_ACTIVITIES action was called', async () => {
    expect.assertions(1);
    const activitiesMockList = [
      new Activity(
        1,
        'Session info',
        'Fundacion jala',
        '2020-11-20T00:00:00.000+00:00',
        'Pending'
      ),
      new Activity(
        2,
        'Session info',
        'Fundacion jala',
        '2020-11-20T00:00:00.000+00:00',
        'Pending'
      ),
      new Activity(
        3,
        'Session info',
        'Fundacion jala',
        '2020-11-20T00:00:00.000+00:00',
        'Pending'
      ),
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () =>
          Promise.resolve({
            data: activitiesMockList,
          }),
      };
    });
    const response = await activities.getActivities(1);
    expect(response).toStrictEqual(activitiesMockList);
  });

  it('should throw the error when invalid get request is called', async () => {
    expect.assertions(1);
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () => Promise.reject(new ErrorForbidden('403', 'Forbidden')),
      };
    });
    try {
      await activities.getActivities();
    } catch (error) {
      expect(error).toStrictEqual(new ErrorForbidden('403', 'Forbidden'));
    }
  });
});
