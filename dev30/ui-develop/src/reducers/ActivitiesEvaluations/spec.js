import reducer from 'reducers/ActivitiesEvaluations';

describe('activities reducer tests', () => {
  it(`should return the state with importResult object when
    SET_UPLOADED_ACTIVITIES_EVALUTIONS was called succesfully`, () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        uploadActivitiesEvaluations: {
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
      reducer(initialState, {
        type: '@ActivitiesEvaluations/SET_UPLOADED_ACTIVITIES_EVALUATIONS',
        payload: {
          message: 'Succesfully pploaded activities evaluations from your file',
          total: '10',
          saved: '10',
          failed: '0',
        },
      })
    ).toStrictEqual({
      errors: {
        uploadActivitiesEvaluations: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: 'Succesfully pploaded activities evaluations from your file',
        total: '10',
        saved: '10',
        failed: '0',
      },
    });
  });

  it(`should return the state with error when uploadActivitiesEvaluations
    function failed and SET_ERRORS actions was called`, () => {
    expect.assertions(1);
    expect(
      reducer(
        {
          errors: {
            uploadActivitiesEvaluations: {
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
        },
        {
          type: '@ActivitiesEvaluations/SET_ERRORS',
          payload: {
            uploadActivitiesEvaluations: {
              code: '403',
              message: 'Forbidden',
            },
          },
        }
      )
    ).toStrictEqual({
      errors: {
        uploadActivitiesEvaluations: {
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

  it('should return the initial state when invalid action was passed', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        uploadActivitiesEvaluations: {
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
      reducer(initialState, {
        type: '@ActivitiesEvaluations/INVALID_ACTION',
      })
    ).toStrictEqual({
      errors: {
        uploadActivitiesEvaluations: {
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
    CLEAR_MESSAGES actions is called`, () => {
    expect.assertions(1);
    expect(
      reducer(
        {},
        {
          type: '@ActivitiesEvaluations/CLEAR_MESSAGES',
          payload: {},
        }
      )
    ).toStrictEqual({
      errors: {
        uploadActivitiesEvaluations: {
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

  it(`should return the state with evaluations result array when 
    SET_EVALUATIONS_RESULT was called successfully`, () => {
    expect.assertions(1);
    const initialState = {
      errors: {},
      importResult: {},
      evaluationsResults: [],
    };

    const resultsEvaluationsMockList = [
      {
        id: '1',
        program: 'DEV-30',
        activity: 'Charla UMSS',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
      {
        id: '2',
        program: 'DEV-30',
        activity: 'Charla UMSS',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
      {
        id: '3',
        program: 'DEV-30',
        activity: 'Charla UMSS',
        exam: 'English level',
        set: 'Second set',
        score: '95.5',
      },
    ];

    expect(
      reducer(initialState, {
        type: '@ActivitiesEvaluations/SET_EVALUATIONS_RESULT',
        payload: resultsEvaluationsMockList,
      })
    ).toStrictEqual({
      errors: {},
      importResult: {},
      evaluationsResults: resultsEvaluationsMockList,
    });
  });
});
