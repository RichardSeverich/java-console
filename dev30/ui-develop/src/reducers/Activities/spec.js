import reducer from 'reducers/Activities';
import Activity from 'app/mappers/Activity';

describe('activities reducer tests', () => {
  it('should return the state with importResult object when SET_UPLOADED_ACTIVITIES was called succesfully', () => {
    expect.assertions(1);
    const initialState = {
      errors: {
        uploadActivities: {
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
        type: '@Activities/SET_UPLOADED_ACTIVITIES',
        payload: {
          message: 'Succesfully pploaded activities from your file',
          total: '5',
          saved: '5',
          failed: '0',
        },
      })
    ).toStrictEqual({
      errors: {
        uploadActivities: {
          code: '',
          message: '',
        },
      },
      importResult: {
        message: 'Succesfully pploaded activities from your file',
        total: '5',
        saved: '5',
        failed: '0',
      },
    });
  });

  it(`should return the state with error when uploadActivities function failed and 
  SET_ERRORS actions was called`, () => {
    expect.assertions(1);
    expect(
      reducer(
        {
          errors: {
            uploadActivities: {
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
          type: '@Activities/SET_ERRORS',
          payload: {
            uploadActivities: {
              code: '403',
              message: 'Forbidden',
            },
          },
        }
      )
    ).toStrictEqual({
      errors: {
        uploadActivities: {
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
        uploadActivities: {
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
        type: '@Activities/INVALID_ACTION',
      })
    ).toStrictEqual({
      errors: {
        uploadActivities: {
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

  it('should return the state with activities array when SET_ACTIVITIES was called succesfully', () => {
    expect.assertions(1);
    const initialState = {
      errors: {},
      importResult: {},
      activities: [],
    };

    const activitiesMockList = [
      new Activity(
        1,
        'Session info',
        'Fundacion jala',
        '2020-11-20T00:00:00.000+00:00',
        'pending'
      ),
      new Activity(
        2,
        'Session info',
        'Fundacion jala',
        '2020-11-20T00:00:00.000+00:00',
        'pending'
      ),
      new Activity(
        3,
        'Session info',
        'Fundacion jala',
        '2020-11-20T00:00:00.000+00:00',
        'pending'
      ),
      new Activity(
        4,
        'Session info',
        'Fundacion jala',
        '2020-11-20T00:00:00.000+00:00',
        'pending'
      ),
    ];

    expect(
      reducer(initialState, {
        type: '@Activities/SET_ACTIVITIES',
        payload: activitiesMockList,
      })
    ).toStrictEqual({
      errors: {},
      importResult: {},
      activities: activitiesMockList,
    });
  });

  it('should return the initial state in error and import messages when CLEAR_MESSAGES actions is called', () => {
    expect.assertions(1);
    expect(
      reducer(
        {},
        {
          type: '@Activities/CLEAR_MESSAGES',
          payload: {},
        }
      )
    ).toStrictEqual({
      errors: {
        uploadActivities: {
          code: '',
          message: '',
        },
        getActivities: {
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
});
