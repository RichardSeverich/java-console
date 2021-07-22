import {
  SET_IMPORT_TEAMS,
  SET_ERRORS,
  CLEAR_MESSAGES,
} from 'app/constant/Teams';
import reducer from 'reducers/Teams';

describe('teams reducer tests', () => {
  it('should return the state passed when an empty action is called', () => {
    expect.assertions(1);
    expect(reducer({}, {})).toStrictEqual({});
  });

  it('should return the state with importResult object when SET_IMPORT_TEAMS was called', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        import: {
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
        type: `@Teams/${SET_IMPORT_TEAMS}`,
        payload: {
          message: 'Uploaded the teams file succesfully',
          total: '5',
          saved: '4',
          failed: '1',
        },
      })
    ).toStrictEqual({
      errors: {
        import: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: 'Uploaded the teams file succesfully',
        total: '5',
        saved: '4',
        failed: '1',
      },
    });
  });

  it('should return the state with error teams file object when SET_ERROR was called', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        import: {
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
        type: `@Teams/${SET_ERRORS}`,
        payload: {
          import: {
            code: '402',
            message: '',
          },
        },
      })
    ).toStrictEqual({
      errors: {
        import: {
          code: '402',
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

  it('should return the initial state in error and import messages when CLEAR_MESSAGES actions is called', () => {
    expect.assertions(1);
    expect(
      reducer(
        {},
        {
          type: `@Teams/${CLEAR_MESSAGES}`,
          payload: {},
        }
      )
    ).toStrictEqual({
      errors: {
        import: {
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
});
