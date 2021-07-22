import apiFactory from 'helpers/apiFactory';
import teams from 'api/Teams';

jest.mock('app/helpers/apiFactory');

describe('teams api tests', () => {
  it('hould get the response object when IMPORT_TEAMS action was called', async () => {
    expect.assertions(4);
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              message: 'Succesfully',
              total: '5',
              saved: '4',
              failed: '1',
            },
          }),
      };
    });
    const formData = new FormData();
    const response = await teams.importTeams(formData);
    expect(response.message).toStrictEqual('Succesfully');
    expect(response.total).toStrictEqual('5');
    expect(response.saved).toStrictEqual('4');
    expect(response.failed).toStrictEqual('1');
  });

  it('should throw the error when importTeams function was called with empty object', async () => {
    expect.assertions(2);
    const dataMock = {
      code: '400',
      message: '',
    };
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () => Promise.reject(dataMock),
      };
    });
    try {
      await teams.importTeams({});
    } catch (error) {
      expect(error.code).toStrictEqual('400');
      expect(error.message).toStrictEqual('');
    }
  });
});
