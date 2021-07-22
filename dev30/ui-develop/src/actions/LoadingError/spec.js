import {
  START_LOADING,
  SET_ERROR,
  STOP_LOADING,
} from 'app/constant/LoadingError';
import actions from 'actions/LoadingError';

describe('loading and Error action tests', () => {
  it('start loading error', () => {
    expect.assertions(1);
    expect(actions.START_LOADING({})).toStrictEqual({
      type: `@Loading/${START_LOADING}`,
      payload: undefined,
    });
  });

  it('sets an error on the state', () => {
    expect.assertions(1);
    expect(actions.SET_ERROR({})).toStrictEqual({
      type: `@Loading/${SET_ERROR}`,
      payload: {},
    });
  });

  it('clears loading and error', () => {
    expect.assertions(1);
    expect(actions.STOP_LOADING({})).toStrictEqual({
      type: `@Loading/${STOP_LOADING}`,
      payload: undefined,
    });
  });
});
