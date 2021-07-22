import React from 'react';
import { render, screen } from '@testing-library/react';
import Program from 'app/mappers/Program';
import Activity from 'app/mappers/Activity';
import Activities from 'app/components/Activities';
import ProgramProgress from './index';

describe('test the program buttons', () => {
  it('should render the component ProgramProgress when loaded', () => {
    expect.assertions(1);
    const mockProgramList = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 31, 'AT', 'Dev 31 description'),
    ];
    const mockProgram = { id: 12, name: 'DEV 30' };
    const mockActivitiesList = [
      new Activity(
        1,
        'Charla UMSS',
        'UMSS',
        '2020-11-20T08:30:00.000+00:00',
        'Pending'
      ),
    ];
    const stages = [
      { id: 1, order: 1, name: 'Introduccion about the program' },
      { id: 2, order: 2, name: 'Technical test about java' },
    ];

    const mockCountActivities = {
      active: 3,
      done: 1,
      pending: 0,
    };

    const mockCheckStatus = {
      active: true,
      done: false,
      pending: true,
    };

    render(
      <ProgramProgress
        selectedProgram={mockProgram}
        activities={mockActivitiesList}
        activitiesFilter={mockActivitiesList}
        stages={stages}
        programs={mockProgramList}
        countActivities={mockCountActivities}
        checkStatus={mockCheckStatus}
      />
    );
    expect(screen.getByText('DEV 30')).toBeInTheDocument();
  });
  it('should represent the component activities when the Activity List is full', () => {
    expect.assertions(2);
    const mockProgram = { id: 12, name: 'DEVINT 31' };
    const mockProgramList = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 31, 'AT', 'Dev 31 description'),
    ];
    const activities = [
      {
        date: '2020-11-20T08:30:00.000+00:00',
        id: 1,
        location: 'UMSS',
        name: 'Charla UMSS',
        status: 'Pending',
        time: null,
      },
      {
        date: '2020-11-21T14:30:00.000+00:00',
        id: 2,
        location: 'Fundacion JALA',
        name: 'Charla 1',
        status: 'Pending',
        time: null,
      },
    ];

    const mockCountActivities = {
      active: 3,
      done: 1,
      pending: 0,
    };

    const mockCheckStatus = {
      active: true,
      done: false,
      pending: true,
    };

    const activitiesRender = (
      <Activities
        activitiesList={activities}
        countActivities={mockCountActivities}
        checkStatus={mockCheckStatus}
      />
    );
    render(
      <ProgramProgress
        selectedProgram={mockProgram}
        activities={activities}
        programs={mockProgramList}
        renderActivities={activitiesRender}
      />
    );
    expect(screen.getByText('UMSS')).toBeInTheDocument();
    expect(screen.getByText('Fundacion JALA')).toBeInTheDocument();
  });
  it('should no render the component activities when is empty the activitiesList', () => {
    expect.assertions(1);
    const mockProgram = { id: 12, name: 'DEVINT 31' };
    const mockProgramList = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 31, 'AT', 'Dev 31 description'),
    ];
    const activities = [];
    render(
      <ProgramProgress
        selectedProgram={mockProgram}
        activities={activities}
        programs={mockProgramList}
      />
    );
    expect(screen.getByText('No Activities defined')).toBeInTheDocument();
  });
});
