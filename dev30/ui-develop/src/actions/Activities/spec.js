import actions from 'actions/Activities';

describe('actions for activities', () => {
  it('should be equal an action creator to UPLOAD_ACTIVITIES when calls the action creator UPLOAD_ACTIVITIES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.UPLOAD_ACTIVITIES(mockPayload)).toStrictEqual({
      type: '@Activities/UPLOAD_ACTIVITIES',
      payload: mockPayload,
    });
  });

  it('should be equal to SET_UPLOADED_ACTIVITIES when calls the action creator SET_UPLOADED_ACTIVITIES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_UPLOADED_ACTIVITIES(mockPayload)).toStrictEqual({
      type: '@Activities/SET_UPLOADED_ACTIVITIES',
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to SET_ERRORS when calls the action creator SET_ERRORS', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_ERRORS(mockPayload)).toStrictEqual({
      type: '@Activities/SET_ERRORS',
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to GET_ACTIVITIES when calls the action creator GET_ACTIVITIES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.GET_ACTIVITIES(mockPayload)).toStrictEqual({
      type: '@Activities/GET_ACTIVITIES',
      payload: mockPayload,
    });
  });

  it('should be equal an action creator to SET_ACTIVITIES when calls the action creator SET_ACTIVITIES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_ACTIVITIES(mockPayload)).toStrictEqual({
      type: '@Activities/SET_ACTIVITIES',
      payload: mockPayload,
    });
  });
});
