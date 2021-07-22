import api from 'api/Candidates';
import candidatesMiddleware from 'middlewares/Candidates';
import {
  GET_CANDIDATES,
  SET_CANDIDATES,
  FETCH_CANDIDATE,
  SET_SELECTED_CANDIDATE,
  GET_CANDIDATE_PROGRAMS,
  SET_CANDIDATE_PROGRAMS,
} from 'app/constant/Candidates';

jest.mock('api/Candidates');

describe('candidates middleware tests', () => {
  it('should upload candidates succesfully when uploadCandidates function was called without errors', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const formData = new FormData();
    const action = {
      type: '@Candidates/UPLOAD_CANDIDATES',
      payload: formData,
    };
    api.uploadCandidates.mockImplementation(() => {
      return Promise.resolve({
        message: 'Successfully uploaded',
        total: '20',
        saved: '20',
        failed: '0',
      });
    });
    await candidatesMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: '@Candidates/SET_UPLOADED_CANDIDATES',
          payload: undefined,
        },
      ],
      [
        {
          type: '@Candidates/SET_ERRORS',
          payload: {
            uploadCandidates: {
              code: '',
              message: '',
            },
          },
        },
      ],
    ]);
  });

  it('should throw error when uploadCandidates action param is an empty object', async () => {
    expect.assertions(2);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@Candidates/UPLOAD_CANDIDATES',
      payload: {},
    };
    api.uploadCandidates.mockImplementation(() => {
      return Promise.reject(
        new Error({
          code: '400',
          message: 'Please upload a file',
        })
      );
    });
    await candidatesMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: '@Candidates/SET_ERRORS',
          payload: {
            uploadCandidates: new Error({
              code: '400',
              message: 'Please upload a file',
            }),
          },
        },
      ],
      [
        {
          type: '@Candidates/SET_UPLOADED_CANDIDATES',
          payload: {
            message: '',
            total: '',
            saved: '',
            failed: '',
          },
        },
      ],
    ]);
  });

  it('should break the middleware when INVALID_ACTION action is called', async () => {
    expect.assertions(1);
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: '@Candidates/INVALID_ACTION',
    };
    await candidatesMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should get candidates successfully when GET_CANDIDATES action was called', async () => {
    expect.assertions(2);
    const mockCandidates = [
      {
        id: 4,
        name: 'Candidate 1',
      },
      {
        id: 5,
        name: 'Candidate 2',
      },
      {
        id: 6,
        name: 'Candidate 3',
      },
    ];
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Candidates/${GET_CANDIDATES}`,
      payload: 1,
    };
    api.getCandidates.mockImplementation(() => {
      return Promise.resolve(mockCandidates);
    });
    await candidatesMiddleware(store)(next)(action);
    expect(api.getCandidates).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Candidates/${SET_CANDIDATES}`,
      payload: mockCandidates,
    });
  });

  it('should get a candidate when FETCH_CANDIDATE action was called', async () => {
    expect.assertions(2);
    const mockCandidate = {
      id: 1,
      firstName: 'Diego',
      lastName: 'Mejia',
      city: 'Cochabamba',
      birthdate: '2020-01-01T06:10:10',
      email: 'doms1369@gmail.com',
      university: 'Catolica',
      career: 'Sistemas',
      semester: '9',
    };
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Candidates/${FETCH_CANDIDATE}`,
      payload: mockCandidate,
    };
    api.getCandidate.mockImplementation(() => {
      return Promise.resolve(mockCandidate);
    });
    await candidatesMiddleware(store)(next)(action);
    expect(api.getCandidate).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Candidates/${SET_SELECTED_CANDIDATE}`,
      payload: mockCandidate,
    });
  });

  it(`should get programs related to a candidate successfully when GET_CANDIDATES_PROGRAMS action
    was called`, async () => {
    expect.assertions(2);
    const mockCandidatePrograms = [
      {
        id: 1,
        program: 'DEV-30',
        status: 'Active',
      },
      {
        id: 2,
        program: 'DEV-31',
        status: 'Dismissed',
      },
      {
        id: 3,
        program: 'AT-5',
        status: 'Dismissed',
      },
    ];
    const store = { dispatch: jest.fn() };
    const next = jest.fn();
    const action = {
      type: `@Candidates/${GET_CANDIDATE_PROGRAMS}`,
      payload: 1,
    };
    api.getCandidatePrograms.mockImplementation(() => {
      return Promise.resolve(mockCandidatePrograms);
    });
    await candidatesMiddleware(store)(next)(action);
    expect(api.getCandidatePrograms).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `@Candidates/${SET_CANDIDATE_PROGRAMS}`,
      payload: mockCandidatePrograms,
    });
  });
});
