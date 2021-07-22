import apiFactory from 'helpers/apiFactory';
import stages from 'api/Stages';
import ProgramStage from 'app/mappers/ProgramStage';

jest.mock('helpers/apiFactory');

describe('stages api test', () => {
  it('should get the response object when IMPORT_STAGES action was called', async () => {
    expect.assertions(2);
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              message: 'Succesfully',
              code: '4',
            },
          }),
      };
    });
    const formData = new FormData();
    const response = await stages.importStages(formData);
    expect(response.message).toStrictEqual('Succesfully');
    expect(response.code).toStrictEqual('4');
  });

  it('should throw the error when importStages funtion was called with empty object', async () => {
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
      await stages.importStages({});
    } catch (error) {
      expect(error.code).toStrictEqual('400');
      expect(error.message).toStrictEqual('');
    }
  });
  it('should get the response object when FETCH_PROGRAM_STAGES action was called', async () => {
    expect.assertions(1);
    const mockProgramStages = [
      {
        id: 1,
        order: 1,
        name: 'STEP 1',
      },
      {
        id: 2,
        order: 2,
        name: 'STEP 2',
      },
      {
        id: 3,
        order: 3,
        name: 'STEP 3',
      },
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () => Promise.resolve({ data: mockProgramStages }),
      };
    });
    const response = await stages.getProgramStages({ programId: 1 });
    expect(response).toStrictEqual(mockProgramStages);
  });

  it('should get the response object when UPDATE_PROGRAM_STAGES action was called', async () => {
    expect.assertions(1);
    const mockProgramStages = [
      new ProgramStage(1, 1, 'Stage 1', '2021-01-01'),
      new ProgramStage(2, 2, 'Stage 1', '2021-02-01'),
      new ProgramStage(3, 3, 'Stage 1', '2021-03-01'),
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        put: () => Promise.resolve({ data: mockProgramStages }),
      };
    });
    const response = await stages.updateProgramStages(1, mockProgramStages);
    expect(response).toEqual(mockProgramStages);
  });

  it(`should throw the error when updateProgramStages function was called with order error and date
    error in the stages list`, async () => {
    expect.assertions(2);
    const dataMock = {
      code: 400,
      message: '',
    };
    const mockProgramStages = [
      new ProgramStage(1, 1, 'Stage 1', '2021-01-01'),
      new ProgramStage(2, 2, 'Stage 1', '2021-01-01'),
      new ProgramStage(3, 4, 'Stage 1', '2021-12-31'),
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        put: () => Promise.reject(dataMock),
      };
    });
    try {
      await stages.updateProgramStages(1, mockProgramStages);
    } catch (error) {
      expect(error.code).toEqual(400);
      expect(error.message).toEqual('');
    }
  });
});
