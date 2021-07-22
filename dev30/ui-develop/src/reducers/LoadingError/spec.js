import {
  START_LOADING,
  SET_ERROR,
  STOP_LOADING,
} from 'app/constant/LoadingError';
import reducer from './index';

describe('loading error reducer tests', () => {
  it('should return the state passed when an empty action is called', () => {
    expect.assertions(1);
    expect(reducer({}, {})).toStrictEqual({});
  });

  it('should change the state to a loading start state', () => {
    expect.assertions(1);
    expect(
      reducer(
        {},
        {
          type: `@Loading/${START_LOADING}`,
        }
      )
    ).toStrictEqual({
      loading: true,
      error: {
        code: '',
        message: '',
      },
    });
  });

  it('should stop the loading variable', () => {
    expect.assertions(1);
    const mockedState = {
      loading: true,
      error: {
        code: '',
        message: '',
      },
    };
    expect(
      reducer(mockedState, {
        type: `@Loading/${STOP_LOADING}`,
      })
    ).toStrictEqual({
      error: {
        code: '',
        message: '',
      },
      loading: false,
    });
  });

  it('sets a sent error to the state', () => {
    expect.assertions(1);
    const mockedState = {
      loading: false,
      error: {
        code: '',
        message: '',
      },
    };
    const error = {
      code: '400',
      message: 'content not found',
    };
    expect(
      reducer(mockedState, {
        type: `@Loading/${SET_ERROR}`,
        payload: error,
      })
    ).toStrictEqual({
      loading: false,
      error: {
        code: '400',
        message: 'content not found',
      },
    });
  });
});
