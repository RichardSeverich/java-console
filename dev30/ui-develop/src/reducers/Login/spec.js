import loginReducer from 'reducers/Login';
import { SIGN_IN, SET_ERRORS, SIGN_OUT } from 'app/constant/Login';

describe('login reducer test', () => {
  it('should return the state passed when there is no action to dispatch', () => {
    expect.assertions(1);
    expect(loginReducer({}, {})).toStrictEqual({});
  });

  it('should return the state with user data when SING_IN action is called succesfully', () => {
    expect.assertions(1);
    expect(
      loginReducer(
        {},
        {
          type: `@Auth/${SIGN_IN}`,
          payload: {
            email: 'sample@fundacion-jala.org',
          },
        }
      )
    ).toStrictEqual({
      user: {
        email: 'sample@fundacion-jala.org',
      },
      errors: {
        changePassword: {
          code: '',
          message: '',
        },
        login: {
          code: '',
          message: '',
        },
      },
    });
  });

  it('should return the state with the error when SET_ERRORS action is called', () => {
    expect.assertions(1);
    expect(
      loginReducer(
        {
          user: {
            email: '',
          },
          errors: {
            login: {
              code: '',
              message: '',
            },
            changePassword: {
              code: '',
              message: '',
            },
          },
        },
        {
          type: `@Auth/${SET_ERRORS}`,
          payload: {
            login: {
              code: '403',
              message: 'Invalid account',
            },
          },
        }
      )
    ).toStrictEqual({
      errors: {
        changePassword: {
          code: '',
          message: '',
        },
        login: {
          code: '403',
          message: 'Invalid account',
        },
      },
      user: {
        email: '',
      },
    });
  });

  it('should return initial state when SING_OUT action is called succesfully', () => {
    expect.assertions(1);
    expect(
      loginReducer(
        {},
        {
          type: `@Auth/${SIGN_OUT}`,
        }
      )
    ).toStrictEqual({
      user: {
        email: '',
      },
      errors: {
        changePassword: {
          code: '',
          message: '',
        },
        login: {
          code: '',
          message: '',
        },
      },
    });
  });
});
