import actions from 'actions/Stages';
import {
  IMPORT_STAGES,
  IMPORT_STAGES_SUCCESS,
  SET_STAGES_ERROR,
  SET_SELECTED_PROGRAM_STAGES,
  UPDATE_PROGRAM_STATES,
  UPDATE_STAGE,
} from 'app/constant/Stages';

describe('stages acctions tests', () => {
  it('should be equal an action creator to IMPORT_STAGES when calls the action creator IMPORT_STAGEGS', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.IMPORT_STAGES(mockPayload)).toStrictEqual({
      type: `@Stages/${IMPORT_STAGES}`,
      payload: mockPayload,
    });
  });

  it(`should be equal an action creator to IMPORT_STAGES_SUCCESS when 
    calls the action creator IMPORT_STAGES_SUCCESS`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.IMPORT_STAGES_SUCCESS(mockPayload)).toStrictEqual({
      type: `@Stages/${IMPORT_STAGES_SUCCESS}`,
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to SET_STAGES_ERROR when calls the action creator SET_STAGES_ERROR', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_STAGES_ERROR(mockPayload)).toStrictEqual({
      type: `@Stages/${SET_STAGES_ERROR}`,
      payload: mockPayload,
    });
  });

  it(`should be equal an action creator to SET_SELECTED_PROGRAM_STAGES when
    calls the action creator SET_SELECTED_PROGRAM_STAGES`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_SELECTED_PROGRAM_STAGES(mockPayload)).toStrictEqual({
      type: `@Stages/${SET_SELECTED_PROGRAM_STAGES}`,
      payload: mockPayload,
    });
  });

  it(`should be equal an action creator to UPDATE_PROGRAM_STAGES when calls the action
    creator UPDATE_PROGRAM_STAGES`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.UPDATE_PROGRAM_STAGES(mockPayload)).toEqual({
      type: `@Stages/${UPDATE_PROGRAM_STATES}`,
      payload: mockPayload,
    });
  });

  it(`should be equal an action creator to UPDATE_STAGE_BY_ID when calls the action
    creator UPDATE_STAGE_BY_ID`, () => {
    expect.assertions(1);
    const mockPayload = {};
    expect(actions.UPDATE_STAGE(mockPayload)).toEqual({
      type: `@Stages/${UPDATE_STAGE}`,
      payload: mockPayload,
    });
  });
});
