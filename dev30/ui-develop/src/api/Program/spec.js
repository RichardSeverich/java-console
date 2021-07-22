import apiFactory from 'helpers/apiFactory';
import programs from 'api/Program';
import Program from 'app/mappers/Program';

jest.mock('../../helpers/apiFactory');

describe('program api tests', () => {
  it('should get the response when calls the get programs function succesfully', async () => {
    expect.assertions(1);
    const mockPrograms = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 10, 'AT', 'AT 10 description'),
      new Program(3, 23, 'MT', 'MT 23 description'),
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () => Promise.resolve({ data: mockPrograms }),
      };
    });
    const response = await programs.getAll();
    expect(response).toStrictEqual(mockPrograms);
  });
  it('should fails the getAll programs when invalid axios instance was sent', async () => {
    expect.assertions(1);
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () => Promise.reject(new Error('invalid credentials')),
      };
    });
    try {
      await programs.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should throw the error when invalid get request is called', async () => {
    expect.assertions(2);
    const dataMock = {
      status: '403',
      message: 'forbidden',
    };
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () => Promise.reject(dataMock),
      };
    });
    try {
      await programs.getAll();
    } catch (error) {
      expect(error.status).toStrictEqual('403');
      expect(error.message).toStrictEqual('forbidden');
    }
  });

  it('should get the response object when IMPORT_PROGRAMS action was called', async () => {
    expect.assertions(5);
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              message: 'Succesfully',
              total: '4',
              saved: '4',
              failed: '0',
            },
          }),
      };
    });
    const formData = new FormData();
    const response = await programs.importPrograms(formData);
    expect(response.message).toStrictEqual('Succesfully');
    expect(response.total).toStrictEqual('4');
    expect(response.saved).toStrictEqual('4');
    expect(response.failed).toStrictEqual('0');
    expect(apiFactory.fileAxiosFactory).toHaveBeenCalledTimes(1);
  });

  it('should throw the error when importPrograms function was called with empty object', async () => {
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
      await programs.importPrograms({});
    } catch (error) {
      expect(error.code).toStrictEqual('400');
      expect(error.message).toStrictEqual('');
    }
  });

  it('should get the response when calls the get program function successfully', async () => {
    expect.assertions(1);
    const mockProgram = new Program(1, 30, 'DEV', 'Dev 30 description');
    const mockId = 1;
    const program = {
      id: 1,
      name: 'DEV 30',
      description: 'Dev 30 description',
    };
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () =>
          Promise.resolve({
            data: mockProgram,
          }),
      };
    });
    const response = await programs.getProgram(mockId);
    expect(response).toEqual(program);
  });

  it('should get the response object when UPDATE_PROGRAM action was called', async () => {
    expect.assertions(1);
    const mockPrograms = new Program(
      1,
      'Dev 30 description',
      '2020-01-15',
      '2020-02-15'
    );
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        put: () => Promise.resolve({ data: mockPrograms }),
      };
    });
    const response = await programs.updateProgram();
    expect(response).toEqual(mockPrograms);
  });

  it('should throw the error when updateProgram function was called', async () => {
    expect.assertions(2);
    const dataMock = {
      code: '400',
      message: '',
    };
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        put: () => Promise.reject(dataMock),
      };
    });
    try {
      await programs.updateProgram({});
    } catch (error) {
      expect(error.code).toEqual('400');
      expect(error.message).toEqual('');
    }
  });
});
