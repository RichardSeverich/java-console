import actions from 'actions/Candidates';

describe('candidates actions tests', () => {
  it('should be equals to @Candidates/UPLOAD_CANDIDATES when calls the action UPLOAD_CANDIDATES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.UPLOAD_CANDIDATES(mockPayload)).toStrictEqual({
      type: '@Candidates/UPLOAD_CANDIDATES',
      payload: mockPayload,
    });
  });

  it(`should be equals to @Candidates/SET_UPLOADED_CANDIDATES when calls the action
    creator SET_UPLOADED_CANDIDATES`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_UPLOADED_CANDIDATES(mockPayload)).toStrictEqual({
      type: '@Candidates/SET_UPLOADED_CANDIDATES',
      payload: mockPayload,
    });
  });

  it('should be equals to @Candidates/SET_ERRORS when calls the action SET_ERRORS', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_ERRORS(mockPayload)).toStrictEqual({
      type: '@Candidates/SET_ERRORS',
      payload: mockPayload,
    });
  });

  it('should be equals to @Candidates/CLEAR_MESSAGES when calls the action CLEAR_MESSAGES', () => {
    expect.assertions(1);
    const mockPayload = undefined;
    expect(actions.CLEAR_MESSAGES(mockPayload)).toStrictEqual({
      type: '@Candidates/CLEAR_MESSAGES',
      payload: mockPayload,
    });
  });

  it('should be equals to @Candidates/GET_CANDIDATES when calls the action GET_CANDIDATES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.GET_CANDIDATES(mockPayload)).toStrictEqual({
      type: '@Candidates/GET_CANDIDATES',
      payload: mockPayload,
    });
  });

  it('should be equals to @Candidates/SET_CANDIDATES when calls the action creator SET_CANDIDATES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_CANDIDATES(mockPayload)).toStrictEqual({
      type: '@Candidates/SET_CANDIDATES',
      payload: mockPayload,
    });
  });

  it(`should be equals to @Candidates/SET_SELECTED_CANDIDATE when calls the action creator
    SET_SELECTED_CANDIDATE`, () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_SELECTED_CANDIDATE(mockPayload)).toStrictEqual({
      type: '@Candidates/SET_SELECTED_CANDIDATE',
      payload: mockPayload,
    });
  });

  it(`should be equals to @Candidates/ GET_CANDIDATE_PROGRAMS when calls the action  
    GET_CANDIDATE_PROGRAMS`, () => {
    expect.assertions(1);
    expect(actions.GET_CANDIDATE_PROGRAMS()).toEqual({
      type: '@Candidates/GET_CANDIDATE_PROGRAMS',
    });
  });

  it(`should be equals to @Candidates/SET_CANDIDATE_PROGRAMS when calls the action 
    SET_CANDIDATE_PROGRAMS`, () => {
    expect.assertions(1);
    expect(actions.SET_CANDIDATE_PROGRAMS()).toEqual({
      type: '@Candidates/SET_CANDIDATE_PROGRAMS',
    });
  });
});
