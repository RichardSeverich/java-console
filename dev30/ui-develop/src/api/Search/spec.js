import apiFactory from 'helpers/apiFactory';
import search from 'api/Search';
import Candidate from 'app/mappers/Candidate';

jest.mock('helpers/apiFactory');

describe('search Api tests', () => {
  it('should get the list of candidates found when SEARCH_CANDIDATES action was called', async () => {
    expect.assertions(1);
    const candidatesMockList = [
      new Candidate(
        1,
        'Jose Ecos',
        'jose.ecos@gmail.com',
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
    const keyWord = 'Jo';

    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () =>
          Promise.resolve({
            data: candidatesMockList,
          }),
      };
    });
    const response = await search.searchCandidates(keyWord);
    expect(response.data).toStrictEqual(candidatesMockList);
  });
});
