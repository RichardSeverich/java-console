import actions from 'actions/Login';
import { LOGIN, SIGN_IN, LOGOUT, CHANGE_PASSWORD } from 'app/constant/Login';

describe('login actions unit tests', () => {
  it('should create an action to login a user', () => {
    expect.assertions(1);
    expect(actions.LOGIN({})).toStrictEqual({
      type: `@Auth/${LOGIN}`,
      payload: {},
    });
  });

  it('should create an action to set a user', () => {
    expect.assertions(1);
    expect(actions.SIGN_IN({})).toStrictEqual({
      type: `@Auth/${SIGN_IN}`,
      payload: {},
    });
  });

  it('should create an action to logout a user', () => {
    expect.assertions(1);
    expect(actions.LOGOUT()).toStrictEqual({
      type: `@Auth/${LOGOUT}`,
      payload: undefined,
    });
  });

  it('should create an action to change password', () => {
    expect.assertions(1);
    expect(actions.CHANGE_PASSWORD({})).toStrictEqual({
      type: `@Auth/${CHANGE_PASSWORD}`,
      payload: {},
    });
  });
});
