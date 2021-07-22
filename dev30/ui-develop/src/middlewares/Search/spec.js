import api from 'api/Search';
import searchMiddleware from 'middlewares/Search';
import { SEARCH_CANDIDATES, SET_SEARCH_CANDIDATES } from 'app/constant/Search';

jest.mock('api/Search');

describe('search middleware test', () => {
  it('should break the middleware when INVALID_ACTION action is called', async () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@Search/INVALID_ACTION',
    };
    await searchMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should get candidates found successfully when SEARCH_CANDIDATES action was called', async () => {
    expect.assertions(2);
    const mockSearchCandidates = [
      {
        id: 4,
        name: 'Jossy Gutierrez',
      },
      {
        id: 5,
        name: 'Jose Ecos',
      },
    ];
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Search/${SEARCH_CANDIDATES}`,
      payload: 'Jo',
    };
    api.searchCandidates.mockImplementation(() => {
      return Promise.resolve(mockSearchCandidates);
    });
    await searchMiddleware(store)(next)(action);
    store.dispatch({
      type: `@Search/${SET_SEARCH_CANDIDATES}`,
      payload: mockSearchCandidates,
    });
    expect(api.searchCandidates).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Search/${SET_SEARCH_CANDIDATES}`,
      payload: mockSearchCandidates,
    });
  });
});
