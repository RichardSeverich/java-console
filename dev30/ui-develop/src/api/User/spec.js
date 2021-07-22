import apiFactory from 'helpers/apiFactory';
import user from 'api/User';

jest.mock('helpers/apiFactory');
describe('user api tests', () => {
  it('should get the response object when CREATED_USER_FILE action was called', async () => {
    expect.assertions(2);
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              rejectedAccounts: '2',
              successfulAccounts: '2',
            },
          }),
      };
    });
    const formData = new FormData();
    const response = await user.createUserFileCSV(formData);
    expect(response.rejectedAccounts).toStrictEqual('2');
    expect(response.successfulAccounts).toStrictEqual('2');
  });

  it('should throw the error when created user file csv function was called with empty object', async () => {
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
      await user.createUserFileCSV({});
    } catch (error) {
      expect(error.code).toStrictEqual('400');
      expect(error.message).toStrictEqual('');
    }
  });
});
