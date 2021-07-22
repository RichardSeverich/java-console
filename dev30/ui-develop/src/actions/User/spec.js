import { CREATED_USER_FILE, SET_RESPONSE_USER, ERROR_USER } from 'actions/User';
import { CREATED, SET_RESPONSE, ERROR } from 'app/constant/User';

describe('user actions tests', () => {
  it('should be equal an action creator to CREATED_USER_FILE when calls the action creator CREATED_USER_FILE', () => {
    expect.assertions(1);
    expect(CREATED_USER_FILE({})).toStrictEqual({
      type: `@User/${CREATED}`,
      payload: {},
    });
  });

  it('should be equal an action creator to SET_RESPONSE_USER when calls the action creator SET_RESPONSE_USER', () => {
    expect.assertions(1);
    expect(SET_RESPONSE_USER({})).toStrictEqual({
      type: `@User/${SET_RESPONSE}`,
      payload: {},
    });
  });

  it('should be equal an action creator to ERROR_USER when calls the action creator ERROR_USER', () => {
    expect.assertions(1);
    expect(ERROR_USER({})).toStrictEqual({
      type: `@User/${ERROR}`,
      payload: {},
    });
  });
});
