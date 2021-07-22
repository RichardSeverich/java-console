import actions from 'actions/Search';

describe('search actions test', () => {
  it('should be equals to @Search/SET_ERRORS when calls the action SET_ERRORS', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_ERRORS(mockPayload)).toStrictEqual({
      type: '@Search/SET_ERRORS',
      payload: mockPayload,
    });
  });
  it('should be equals to @Search/SEARCH_CANDIDATES when calls the action creator SEARCH_CANDIDATES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SEARCH_CANDIDATES(mockPayload)).toStrictEqual({
      type: '@Search/SEARCH_CANDIDATES',
      payload: mockPayload,
    });
  });
  it('should be equals to @Search/SET_SEARCH_CANDIDATES when calls the action creator SET_SEARCH_CANDIDATES', () => {
    expect.assertions(1);
    const mockPayload = '';
    expect(actions.SET_SEARCH_CANDIDATES(mockPayload)).toStrictEqual({
      type: '@Search/SET_SEARCH_CANDIDATES',
      payload: mockPayload,
    });
  });
});
