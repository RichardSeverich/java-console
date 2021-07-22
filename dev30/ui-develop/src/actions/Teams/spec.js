import actions from 'actions/Teams';
import { IMPORT_TEAMS, SET_IMPORT_TEAMS, SET_ERRORS } from 'app/constant/Teams';

describe('teams actions unit tests', () => {
  it('should be equal an action to IMPORT_TEAMS when calls the action IMPORT_TEAMS', () => {
    expect.assertions(1);
    expect(actions.IMPORT_TEAMS({})).toStrictEqual({
      type: `@Teams/${IMPORT_TEAMS}`,
      payload: {},
    });
  });

  it('should be equal an action to SET_IMPORT_TEAMS when calls the action SET_IMPORT_TEAMS', () => {
    expect.assertions(1);
    expect(actions.SET_IMPORT_TEAMS({})).toStrictEqual({
      type: `@Teams/${SET_IMPORT_TEAMS}`,
      payload: {},
    });
  });

  it('should be equal an action to SET_ERRORS when calls the action SET_ERRORS', () => {
    expect.assertions(1);
    expect(actions.SET_ERRORS({})).toStrictEqual({
      type: `@Teams/${SET_ERRORS}`,
      payload: {},
    });
  });
});
