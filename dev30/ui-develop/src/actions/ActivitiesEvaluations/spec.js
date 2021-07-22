import actions from 'actions/ActivitiesEvaluations';

describe('activities evaluations actions tests', () => {
  it(`should be equals to @ActivitiesEvaluations/UPLOAD_ACTIVTIES_EVALUATIONS when calls 
    the action UPLOAD_ACTIVTIES_EVALUATIONS`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.UPLOAD_ACTIVITIES_EVALUATIONS(mockPayload)).toStrictEqual({
      type: '@ActivitiesEvaluations/UPLOAD_ACTIVITIES_EVALUATIONS',
      payload: mockPayload,
    });
  });

  it(`should be equals to @ActivitiesEvaluations/SET_UPLOADED_ACTIVITIES_EVALUATIONS when calls
    the action SET_UPLOADED_ACTIVITIES_EVALUATIONS`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(
      actions.SET_UPLOADED_ACTIVITIES_EVALUATIONS(mockPayload)
    ).toStrictEqual({
      type: '@ActivitiesEvaluations/SET_UPLOADED_ACTIVITIES_EVALUATIONS',
      payload: mockPayload,
    });
  });

  it('should be equals to @ActivitiesEvaluations/SET_ERRORS when calls the action SET_ERRORS', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_ERRORS(mockPayload)).toStrictEqual({
      type: '@ActivitiesEvaluations/SET_ERRORS',
      payload: mockPayload,
    });
  });

  it('should be equals to @ActivitiesEvaluations/CLEAR_MESSAGES when calls the action CLEAR_MESSAGES', () => {
    expect.assertions(1);
    const mockPayload = undefined;
    expect(actions.CLEAR_MESSAGES()).toStrictEqual({
      type: '@ActivitiesEvaluations/CLEAR_MESSAGES',
      payload: mockPayload,
    });
  });

  it(`should be equals to @ActivitiesEvaluations/GET_EVALUATIONS_RESULT when calls the 
    action GET_EVALUATIONS_RESULT`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.GET_EVALUATIONS_RESULT(mockPayload)).toStrictEqual({
      type: '@ActivitiesEvaluations/GET_EVALUATIONS_RESULT',
      payload: mockPayload,
    });
  });

  it(`should be equals to @ActivitiesEvaluations/SET_EVALUATIONS_RESULT when calls the action 
    SET_EVALUATIONS_RESULT`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_EVALUATIONS_RESULT(mockPayload)).toStrictEqual({
      type: '@ActivitiesEvaluations/SET_EVALUATIONS_RESULT',
      payload: mockPayload,
    });
  });
});
