import apiFactory from 'helpers/apiFactory';
import candidates from 'api/Candidates';
import Candidate from 'app/mappers/Candidate';
import ErrorForbidden from 'app/mappers/ErrorForbidden';

jest.mock('helpers/apiFactory');

describe('candidates Api tests', () => {
  it('should be equals the response object when UPLOAD_CANDIDATES action was called succesfully', async () => {
    expect.assertions(4);
    apiFactory.fileAxiosFactory.mockImplementation(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              message: 'Successfully uploaded file',
              total: '20',
              saved: '20',
              failed: '0',
            },
          }),
      };
    });
    const formData = new FormData();
    const response = await candidates.uploadCandidates(formData);
    expect(response.data.message).toStrictEqual('Successfully uploaded file');
    expect(response.data.total).toStrictEqual('20');
    expect(response.data.saved).toStrictEqual('20');
    expect(response.data.failed).toStrictEqual('0');
  });

  it('should get list of candidates when GET_CANDIDATES action was called', async () => {
    expect.assertions(1);
    const candidatesMockList = [
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
      new Candidate(
        3,
        'Carlos Pinto',
        'carlos.pinto@gmail.com',
        75955556,
        null,
        'Active'
      ),
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () =>
          Promise.resolve({
            data: candidatesMockList,
          }),
      };
    });
    const response = await candidates.getCandidates(1);
    expect(response).toStrictEqual(candidatesMockList);
  });

  it('should throw the error when invalid get request is called', async () => {
    expect.assertions(1);
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () => Promise.reject(new ErrorForbidden('403', 'Forbidden')),
      };
    });
    try {
      await candidates.getCandidates(1);
    } catch (error) {
      expect(error).toStrictEqual(new ErrorForbidden('403', 'Forbidden'));
    }
  });

  it(`should get list of programs related to a candidate when GET_CANDIDATE_PROGRAMS action was 
    called`, async () => {
    expect.assertions(1);
    const historyCandidateMock = [
      {
        id: '1',
        program: 'DEV-30',
        status: 'Active',
      },
      {
        id: '2',
        program: 'DEV-31',
        status: 'Dismissed',
      },
      {
        id: '3',
        program: 'AT-5',
        status: 'Dismissed',
      },
    ];
    apiFactory.axiosFactory.mockImplementation(() => {
      return {
        get: () =>
          Promise.resolve({
            data: historyCandidateMock,
          }),
      };
    });
    const response = await candidates.getCandidatePrograms(1);
    expect(response).toEqual(historyCandidateMock);
  });
});
