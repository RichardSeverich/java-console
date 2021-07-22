import candidatesReducer from 'reducers/Candidates';
import Candidate from 'app/mappers/Candidate';

describe('candidates reducer tests', () => {
  it(`should return the state with importResult object when 
  SET_UPLOADED_CANDIDATES action was called successfully`, () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        uploadCandidates: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    };
    expect(
      candidatesReducer(initialState, {
        type: '@Candidates/SET_UPLOADED_CANDIDATES',
        payload: {
          message: 'Successfully uploaded candidates from your file',
          total: '20',
          saved: '20',
          failed: '0',
        },
      })
    ).toStrictEqual({
      errors: {
        uploadCandidates: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: 'Successfully uploaded candidates from your file',
        total: '20',
        saved: '20',
        failed: '0',
      },
    });
  });

  it(`should returns the state with error when uploadCandidates function failed and 
  SET_ERRORS action was called`, () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        uploadCandidates: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    };
    expect(
      candidatesReducer(initialState, {
        type: '@Candidates/SET_ERRORS',
        payload: {
          uploadCandidates: {
            code: '403',
            message: 'Forbidden',
          },
        },
      })
    ).toStrictEqual({
      errors: {
        uploadCandidates: {
          code: '403',
          message: 'Forbidden',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    });
  });

  it('should returns the initial state when INVALID_ACTION action was passed', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        uploadCandidates: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    };
    expect(
      candidatesReducer(initialState, {
        type: '@Candidates/INVALID_ACTION',
      })
    ).toStrictEqual({
      errors: {
        uploadCandidates: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    });
  });

  it(`should return the initial state in error and import messages when 
  CLEAR_MESSAGES actions was called`, () => {
    expect.assertions(1);
    expect(
      candidatesReducer(
        {},
        {
          type: '@Candidates/CLEAR_MESSAGES',
          payload: {},
        }
      )
    ).toStrictEqual({
      errors: {
        uploadCandidates: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: '',
        total: '',
        saved: '',
        failed: '',
      },
    });
  });

  it(`should return the state with candidates array when 
  SET_CANDIDATES was called successfully`, () => {
    expect.assertions(1);
    const initialState = {
      errors: {},
      importResult: {},
      candidates: [],
    };

    const mockCandidates = [
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
      new Candidate(
        4,
        'Dennis Padilla',
        'dennis.padilla@gmail.com',
        75955557,
        null,
        'Active'
      ),
    ];

    expect(
      candidatesReducer(initialState, {
        type: '@Candidates/SET_CANDIDATES',
        payload: mockCandidates,
      })
    ).toStrictEqual({
      errors: {},
      importResult: {},
      candidates: mockCandidates,
    });
  });

  it('should return the state with SET_SELECTED_CANDIDATE was called successfully', () => {
    expect.assertions(1);
    const initialState = {
      errors: {},
      importResult: {},
      candidates: [],
      selectedCandidate: {},
    };

    const mockSelectedCandidate = {
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

    expect(
      candidatesReducer(initialState, {
        type: '@Candidates/SET_SELECTED_CANDIDATE',
        payload: mockSelectedCandidate,
      })
    ).toStrictEqual({
      errors: {},
      importResult: {},
      candidates: [],
      selectedCandidate: mockSelectedCandidate,
    });
  });

  it(`should return the state with programs related to a candidate array when 
    SET_CANDIDATE_PROGRAMS was called successfully`, () => {
    expect.assertions(1);
    const initialState = {
      errors: {},
      importResult: {},
      candidatePrograms: [],
    };

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

    expect(
      candidatesReducer(initialState, {
        type: '@Candidates/SET_CANDIDATE_PROGRAMS',
        payload: mockCandidatePrograms,
      })
    ).toEqual({
      errors: {},
      importResult: {},
      candidatePrograms: mockCandidatePrograms,
    });
  });
});
