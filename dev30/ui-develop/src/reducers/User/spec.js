import { SET_RESPONSE_USER, ERROR_USER, CLEAR_MESSAGES } from 'actions/User';
import reducer from 'reducers/User';

describe('user Maintenance reducer tests', () => {
  it('should return the state with created user file csv object when CREATED_USER_FILE was called', () => {
    expect.assertions(1);
    const initialState = {
      userCreateFile: {
        successfulAccounts: '',
        rejectedAccounts: '',
      },
      error: {
        code: '',
        message: '',
      },
    };
    expect(
      reducer(initialState, {
        type: `@User/${SET_RESPONSE_USER}`,
        payload: {
          successfulAccounts: '2',
          rejectedAccounts: '2',
        },
      })
    ).toStrictEqual({
      error: {
        code: '',
        message: '',
      },
      userCreateFile: {
        successfulAccounts: '',
        rejectedAccounts: '',
      },
    });
  });
  it('should return the state with error user file csv object when ERROR_USER was called', () => {
    expect.assertions(1);
    const initialState = {
      userCreateFile: {
        successfulAccounts: '',
        rejectedAccounts: '',
      },
      error: {
        code: '',
        message: '',
      },
    };
    expect(
      reducer(initialState, {
        type: `@User/${ERROR_USER}`,
        payload: {
          error: {
            code: 402,
            message: '',
          },
        },
      })
    ).toStrictEqual({
      userCreateFile: {
        successfulAccounts: '',
        rejectedAccounts: '',
      },
      error: {
        code: '',
        message: '',
      },
    });
  });

  it('should return the initial state in error and import messages when CLEAR_MESSAGES actions is called', () => {
    expect.assertions(1);
    const initialState = {
      userCreateFile: { message: '', total: '', saved: '', failed: '' },
      error: { code: '', message: '' },
    };
    expect(
      reducer(initialState, {
        type: `@User/${CLEAR_MESSAGES}`,
        payload: {},
      })
    ).toStrictEqual({
      userCreateFile: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
      error: {
        code: '',
        message: '',
      },
    });
  });
});
