import actions from 'actions/Program';
import {
  CLEAR_PROGRAMS,
  FETCH_PROGRAMS,
  SET_ERRORS,
  SET_PROGRAMS,
  GET_PROGRAM,
  SET_PROGRAM,
  UPDATE_PROGRAM,
  SET_PROGRAM_TO_EDIT,
} from 'app/constant/Program';

describe('program actions tests', () => {
  it('should be equal an action creator to FETCH_PROGRAMS when calls the action creator FETCH_PROGRAMS', () => {
    expect.assertions(1);
    expect(actions.FETCH_PROGRAMS()).toStrictEqual({
      type: `@Program/${FETCH_PROGRAMS}`,
      payload: undefined,
    });
  });

  it('should be equal an action creator to SET_PROGRAMS when calls the action creator SET_PROGRAMS', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_PROGRAMS(mockPayload)).toStrictEqual({
      type: `@Program/${SET_PROGRAMS}`,
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to SET_ERRORS when calls the action creator SET_ERRORS', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_ERRORS(mockPayload)).toStrictEqual({
      type: `@Program/${SET_ERRORS}`,
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to CLEAR_PROGRAMS when calls the action creator CLEAR_PROGRAMS', () => {
    expect.assertions(1);
    const mockPayload = undefined;
    expect(actions.CLEAR_PROGRAMS()).toStrictEqual({
      type: `@Program/${CLEAR_PROGRAMS}`,
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to GET_PROGRAM when calls the action', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.GET_PROGRAM(mockPayload)).toStrictEqual({
      type: `@Program/${GET_PROGRAM}`,
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to SET_PROGRAM when calls the action creator GET_PROGRAM', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_PROGRAM(mockPayload)).toStrictEqual({
      type: `@Program/${SET_PROGRAM}`,
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to UPDATE_PROGRAM when calls the action creator UPDATE_PROGRAM', () => {
    expect.assertions(1);
    expect(actions.UPDATE_PROGRAM()).toStrictEqual({
      type: `@Program/${UPDATE_PROGRAM}`,
      payload: undefined,
    });
  });

  it(`should be equal an action creator to SET_PROGRAM_TO_EDIT when calls the action creator 
      SET_PROGRAM_TO_EDIT`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_PROGRAM_TO_EDIT(mockPayload)).toStrictEqual({
      type: `@Program/${SET_PROGRAM_TO_EDIT}`,
      payload: mockPayload,
    });
  });
});
