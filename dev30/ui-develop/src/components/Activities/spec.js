import React from 'react';
import { render, screen } from '@testing-library/react';
import Activities from './index';

describe('activities is a component for view all activities about a program', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(2);
    const mockActivitiesList = [
      {
        id: 1,
        name: 'Charla UMSS',
        location: 'UMSS',
        date: '11-20-2020',
        type: 'Group',
        status: 'Pending',
      },
      {
        id: 2,
        name: 'Charla 1',
        location: 'Fundacion',
        date: '11-21-2020',
        type: 'Group',
        status: 'Pending',
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
    render(
      <Activities
        activitiesList={mockActivitiesList}
        countActivities={mockCountActivities}
        checkStatus={mockCheckStatus}
      />
    );
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText('Charla UMSS')).toBeInTheDocument();
  });
});
