import searchReducer from 'reducers/Search';
import Candidate from 'app/mappers/Candidate';

describe('search reducer tests', () => {
  it('should returns the initial state when INVALID_ACTION action was passed', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        searchCandidates: {
          code: '',
          message: '',
        },
      },
    };
    expect(
      searchReducer(initialState, {
        type: '@Search/INVALID_ACTION',
      })
    ).toStrictEqual({
      errors: {
        searchCandidates: {
          code: '',
          message: '',
        },
      },
    });
  });

  it('should return the state with candidates found array when SET_SEARCH_CANDIDATES was called successfully', () => {
    expect.assertions(1);
    const initialState = {
      errors: {},
      searchCandidates: [],
    };

    const mockSearchCandidates = [
      new Candidate(
        1,
        'Jose Ecos',
        'daniel.lopez@gmail.com',
        75955554,
        null,
        'Active'
      ),
      new Candidate(
        2,
        'Jossy Gutierrez',
        'jossy.gutierrez@gmail.com',
        75955555,
        null,
        'Active'
      ),
    ];

    expect(
      searchReducer(initialState, {
        type: '@Search/SET_SEARCH_CANDIDATES',
        payload: mockSearchCandidates,
      })
    ).toStrictEqual({
      errors: {},
      searchCandidates: mockSearchCandidates,
    });
  });
});
