import reducer from 'reducers/Stages';
import {
  IMPORT_STAGES_SUCCESS,
  SET_STAGES_ERROR,
  CLEAR_MESSAGES,
  UPDATE_STAGE,
} from 'app/constant/Stages';
import ProgramStage from 'app/mappers/ProgramStage';

describe('stage maintenance reducer tests', () => {
  it('should return the state passed when an empty actio is called', () => {
    expect.assertions(1);
    expect(reducer({}, {})).toStrictEqual({});
  });

  it('should return the state with error user file json, when SET_STAGES_ERROR was called', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        getProgramStages: {
          code: 0,
          message: '',
        },
        updateProgramStages: {
          code: 0,
          message: '',
        },
        importJSON: {
          code: 0,
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
        type: `@Stages/${SET_STAGES_ERROR}`,
        payload: {
          importJSON: {
            code: 402,
            message: '',
          },
        },
      })
    ).toStrictEqual({
      errors: {
        getProgramStages: {
          code: 0,
          message: '',
        },
        updateProgramStages: {
          code: 0,
          message: '',
        },
        importJSON: {
          code: 402,
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

  it('should return the state with importResult user file json, when IMPORT_STAGES_SUCCESS was called', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        getProgramStages: {
          code: 0,
          message: '',
        },
        updateProgramStages: {
          code: 0,
          message: '',
        },
        importJSON: {
          code: 0,
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
        type: `@Stages/${IMPORT_STAGES_SUCCESS}`,
        payload: {
          message: 'Uploaded the stages json file succesfully',
          total: '2',
          saved: '2',
          failed: '0',
        },
      })
    ).toStrictEqual({
      errors: {
        getProgramStages: {
          code: 0,
          message: '',
        },
        updateProgramStages: {
          code: 0,
          message: '',
        },
        importJSON: {
          code: 0,
          message: '',
        },
      },
      importResult: {
        message: 'Uploaded the stages json file succesfully',
        total: '2',
        saved: '2',
        failed: '0',
      },
    });
  });

  it('should return the initial state in error and import messages when CLEAR_MESSAGES actions is called', () => {
    expect.assertions(1);
    expect(
      reducer(
        {},
        {
          type: `@Stages/${CLEAR_MESSAGES}`,
          payload: {},
        }
      )
    ).toStrictEqual({
      errors: {
        getProgramStages: {
          code: 0,
          message: '',
        },
        updateProgramStages: {
          code: 0,
          message: '',
        },
        importJSON: {
          code: 0,
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

  it('should return a array of stage updated when UPDATE_STAGE actions is called', () => {
    expect.assertions(1);
    const mockStage = [
      new ProgramStage(1, 1, 'Stage 1', null),
      new ProgramStage(2, 2, 'Stage 2', null),
      new ProgramStage(3, 3, 'Stage 3', null),
    ];
    const initialState = {
      programStages: mockStage,
    };
    expect(
      reducer(initialState, {
        type: `@Stages/${UPDATE_STAGE}`,
        payload: {
          id: 2,
          order: 2,
          name: 'Name changed',
          startDate: null,
        },
      })
    ).toStrictEqual({
      programStages: [
        new ProgramStage(1, 1, 'Stage 1', null),
        new ProgramStage(2, 2, 'Name changed', null),
        new ProgramStage(3, 3, 'Stage 3', null),
      ],
    });
  });
});
