import api from 'api/Program';
import programMiddleware from 'middlewares/Program';
import Program from 'app/mappers/Program';
import {
  FETCH_PROGRAMS,
  IMPORT_PROGRAMS,
  SET_IMPORT_PROGRAMS,
  SET_ERRORS,
  SET_PROGRAMS,
  GET_PROGRAM,
  SET_PROGRAM,
  UPDATE_PROGRAM,
} from 'app/constant/Program';

jest.mock('api/Program');

describe('program middleware tests', () => {
  it('should get programs succesfully when FETCH_PROGRAMS action was called', async () => {
    expect.assertions(2);
    const mockPrograms = [new Program(1, 30, 'DEV', 'Dev 30 description')];
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Program/${FETCH_PROGRAMS}`,
    };
    api.getAll.mockImplementation(() => {
      return Promise.resolve(mockPrograms);
    });
    await programMiddleware(store)(next)(action);
    expect(api.getAll).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Program/${SET_PROGRAMS}`,
      payload: mockPrograms,
    });
  });

  it('should dispatch error when FETCH_PROGRAMS actions is called with error', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Program/${FETCH_PROGRAMS}`,
    };
    const dataMock = {
      code: '403',
      message: 'forbidden',
    };

    api.getAll.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    await programMiddleware(store)(next)(action);
    expect(api.getAll).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Program/${SET_ERRORS}`,
      payload: {
        getAll: {
          code: '403',
          message: 'forbidden',
        },
      },
    });
  });

  it('should break the middleware when INVALID_ACTION action is called', () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@Program/INVALID_ACTION',
    };
    programMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should import programs succesfully when importPrograms function was called', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const formData = new FormData();
    const action = {
      type: `@Program/${IMPORT_PROGRAMS}`,
      payload: formData,
    };
    api.importPrograms.mockImplementation(() => {
      return Promise.resolve({
        message: 'success',
        total: '4',
        saved: '4',
        failed: '0',
      });
    });
    await programMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Program/${SET_IMPORT_PROGRAMS}`,
      payload: {
        message: 'success',
        total: '4',
        saved: '4',
        failed: '0',
      },
    });
  });

  it('should throw error when importPrograms param is an empty object', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Program/${IMPORT_PROGRAMS}`,
      payload: {},
    };
    const dataMock = {
      code: '400',
      message: 'empty',
    };
    api.importPrograms.mockImplementation(() => {
      return Promise.reject(dataMock);
    });
    await programMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Program/${SET_ERRORS}`,
      payload: {
        importCSV: {
          code: '400',
          message: 'empty',
        },
      },
    });
  });

  it('should get program succesfully when getProgram function was called', async () => {
    expect.assertions(2);
    const mockId = 1;
    const mockProgram = {
      id: 1,
      name: 'DEV 30',
    };
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Program/${GET_PROGRAM}`,
      payload: mockId,
    };
    api.getProgram.mockImplementation(() => {
      return Promise.resolve(mockProgram);
    });
    await programMiddleware(store)(next)(action);
    expect(api.getProgram).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Program/${SET_PROGRAM}`,
      payload: mockProgram,
    });
  });

  it('should update the selected program', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const mockUpdatedProgram = {
      id: 1,
      description: 'DEV 30 special program',
      startDate: '2022-02-05',
      endDate: '2022-04-01',
    };
    api.getProgram.mockImplementation(() => {
      return Promise.resolve(mockUpdatedProgram);
    });
    api.updateProgram.mockImplementation(() => {
      return Promise.resolve(mockUpdatedProgram);
    });
    const updateAction = {
      type: `@Program/${UPDATE_PROGRAM}`,
      payload: mockUpdatedProgram,
    };
    await programMiddleware(store)(next)(updateAction);
    expect(api.updateProgram).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Program/${SET_PROGRAM}`,
      payload: mockUpdatedProgram,
    });
  });
});
