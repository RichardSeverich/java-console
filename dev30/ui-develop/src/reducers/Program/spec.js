import {
  CLEAR_PROGRAMS,
  SET_IMPORT_PROGRAMS,
  SET_ERRORS,
  SET_PROGRAMS,
  SET_PROGRAM,
  CLEAR_MESSAGES,
  SET_PROGRAM_TO_EDIT,
} from 'app/constant/Program';
import Program from 'app/mappers/Program';
import reducer from 'reducers/Program';

describe('program reducer tests', () => {
  it('should return the state passed when an empty action is called', () => {
    expect.assertions(1);
    expect(reducer({}, {})).toStrictEqual({});
  });

  it('should return the state with the programs when SET_PROGRAMS actions is passed succesfully', () => {
    expect.assertions(1);
    const mockPrograms = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 10, 'AT', 'AT 10 description'),
      new Program(3, 23, 'MT', 'MT 23 description'),
    ];
    expect(
      reducer(
        {},
        {
          type: `@Program/${SET_PROGRAMS}`,
          payload: mockPrograms,
        }
      )
    ).toStrictEqual({
      programs: mockPrograms,
    });
  });

  it('should return the state with error when getAll function fails and SET_ERRORS actions is called', () => {
    expect.assertions(1);
    expect(
      reducer(
        {
          programs: [],
          errors: {
            getAll: {
              code: '',
              message: '',
            },
            importCSV: {
              code: '',
              message: '',
            },
          },
          importResult: {
            message: '',
            total: '',
            saved: '',
            failed: '',
          },
        },
        {
          type: `@Program/${SET_ERRORS}`,
          payload: {
            getAll: {
              code: '403',
              message: 'Forbidden',
            },
          },
        }
      )
    ).toStrictEqual({
      programs: [],
      errors: {
        getAll: {
          code: '403',
          message: 'Forbidden',
        },
        importCSV: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    });
  });

  it('should return the initial state when CLEAR_PROGRAMS actions is called', () => {
    expect.assertions(1);
    expect(
      reducer(
        {},
        {
          type: `@Program/${CLEAR_PROGRAMS}`,
          payload: {},
        }
      )
    ).toStrictEqual({
      programs: [],
      errors: {
        getAll: {
          code: '',
          message: '',
        },
        importCSV: {
          code: '',
          message: '',
        },
        getProgram: {
          code: '',
          message: '',
        },
        updateProgram: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
      selectedProgram: {
        id: 0,
        name: '',
        description: '',
        startDate: '',
        endDate: '',
      },
      programToEdit: {},
    });
  });

  it('should return the state with importResult object when SET_IMPORT_PROGRAMS was called', () => {
    expect.assertions(1);
    const initialState = {
      programs: [],
      errors: {
        getAll: {
          code: '',
          message: '',
        },
        importCSV: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    };
    expect(
      reducer(initialState, {
        type: `@Program/${SET_IMPORT_PROGRAMS}`,
        payload: {
          message: 'Uploaded the programs csv file succesfully',
          total: '4',
          saved: '4',
          failed: '0',
        },
      })
    ).toStrictEqual({
      programs: [],
      errors: {
        getAll: {
          code: '',
          message: '',
        },
        importCSV: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: 'Uploaded the programs csv file succesfully',
        total: '4',
        saved: '4',
        failed: '0',
      },
    });
  });
  it('should return the state with the programs when SET_PROGRAM actions is passed succesfully', () => {
    expect.assertions(1);
    const mockProgram = {
      id: 1,
      name: 'DEV 30',
    };
    expect(
      reducer(
        {},
        {
          type: `@Program/${SET_PROGRAM}`,
          payload: mockProgram,
        }
      )
    ).toStrictEqual({ selectedProgram: mockProgram });
  });

  it('should return the initial state in error and import messages when CLEAR_MESSAGES actions is called', () => {
    expect.assertions(1);
    expect(
      reducer(
        {},
        {
          type: `@Program/${CLEAR_MESSAGES}`,
          payload: {},
        }
      )
    ).toStrictEqual({
      errors: {
        getAll: {
          code: '',
          message: '',
        },
        importCSV: {
          code: '',
          message: '',
        },
        getProgram: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    });
  });

  it('should return the state with the program when SET_PROGRAM_TO_EDIT action is passed succesfully', () => {
    expect.assertions(1);
    const mockProgram = {
      id: 1,
      description: 'Dev 30 description',
      startDate: '2020-01-15',
      endDate: '2020-02-15',
    };

    expect(
      reducer(
        {},
        {
          type: `@Program/${SET_PROGRAM_TO_EDIT}`,
          payload: mockProgram,
        }
      )
    ).toEqual({
      selectedProgram: mockProgram,
    });
  });
});
