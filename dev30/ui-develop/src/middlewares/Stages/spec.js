import api from 'api/Stages';
import stagesMiddleware from 'middlewares/Stages';
import {
  IMPORT_STAGES,
  IMPORT_STAGES_SUCCESS,
  SET_STAGES_ERROR,
  FETCH_PROGRAM_STAGES,
  SET_SELECTED_PROGRAM_STAGES,
  UPDATE_PROGRAM_STATES,
} from 'app/constant/Stages';
import ProgramStage from 'app/mappers/ProgramStage';

jest.mock('api/Stages');

describe('stages middleware tests', () => {
  it('should import stages succesfully when importStages function was called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const formData = new FormData();
    const action = {
      type: `@Stages/${IMPORT_STAGES}`,
      payload: formData,
    };
    api.importStages.mockImplementation(() => {
      return Promise.resolve({
        message: 'success',
        total: '2',
        saved: '2',
        failed: '0',
      });
    });
    await stagesMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Stages/${IMPORT_STAGES_SUCCESS}`,
      payload: {
        message: 'success',
        total: '2',
        saved: '2',
        failed: '0',
      },
    });
  });

  it('should throw error when importStages parameters is empty object', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Stages/${IMPORT_STAGES}`,
      payload: {},
    };
    const dataMock = {
      code: 400,
      message: 'empty',
    };
    api.importStages.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    await stagesMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Stages/${SET_STAGES_ERROR}`,
      payload: {
        importJSON: {
          code: 400,
          message: 'empty',
        },
      },
    });
  });

  it('should get program stages succesfully when FETCH_PROGRAM_STAGES action was called', async () => {
    expect.assertions(2);
    const mockProgramStages = [
      {
        id: 4,
        order: 1,
        name: 'Step 1',
      },
      {
        id: 5,
        order: 2,
        name: 'Step 2',
      },
      {
        id: 6,
        order: 3,
        name: 'Step 3',
      },
    ];
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Stages/${FETCH_PROGRAM_STAGES}`,
      payload: { programId: 1 },
    };
    api.getProgramStages.mockImplementation(() => {
      return Promise.resolve(mockProgramStages);
    });
    await stagesMiddleware(store)(next)(action);
    expect(api.getProgramStages).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Stages/${SET_SELECTED_PROGRAM_STAGES}`,
      payload: mockProgramStages,
    });
  });

  it('should get program stages successfully when UPDATE_PROGRAM_STAGES action was called', async () => {
    expect.assertions(2);
    const mockProgramStages = [
      new ProgramStage(1, 1, 'Stage 1', '2021-01-01'),
      new ProgramStage(2, 2, 'Stage 1', '2021-02-01'),
      new ProgramStage(3, 3, 'Stage 1', '2021-03-01'),
    ];
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Stages/${UPDATE_PROGRAM_STATES}`,
      payload: { programId: 1, stages: mockProgramStages },
    };
    api.updateProgramStages.mockImplementation(() => {
      return Promise.resolve(mockProgramStages);
    });
    await stagesMiddleware(store)(next)(action);
    expect(api.updateProgramStages).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Stages/${FETCH_PROGRAM_STAGES}`,
      payload: 1,
    });
  });

  it('should throw error get program stages successfully when UPDATE_PROGRAM_STAGES action was called', async () => {
    expect.assertions(2);
    const mockProgramStages = [
      new ProgramStage(1, 1, 'Stage 1', '2021-01-01'),
      new ProgramStage(2, 2, 'Stage 1', '2021-01-01'),
      new ProgramStage(3, 4, 'Stage 1', '2021-12-31'),
    ];
    const dataMock = {
      code: 400,
      message: 'Order error and start date error',
    };
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Stages/${UPDATE_PROGRAM_STATES}`,
      payload: { programId: 1, stages: mockProgramStages },
    };
    api.updateProgramStages.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    await stagesMiddleware(store)(next)(action);
    expect(api.updateProgramStages).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Stages/${SET_STAGES_ERROR}`,
      payload: {
        updateProgramStages: {
          code: 400,
          message: 'Order error and start date error',
        },
      },
    });
  });
});
