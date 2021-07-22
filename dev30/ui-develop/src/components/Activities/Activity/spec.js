import React from 'react';
import { render, screen } from '@testing-library/react';
import Activity from './index';

describe('activity is a component for view activity details', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(5);
    const name = 'Charla UMSS';
    const location = 'UMSS';
    const type = 'Group';
    const date = '2020-11-20T08:30:00.000+00:00';
    const status = 'Pending';
    render(
      <Activity
        name={name}
        location={location}
        type={type}
        date={date}
        status={status}
      />
    );
    expect(screen.getByText('Charla UMSS')).toBeInTheDocument();
    expect(screen.getByText('UMSS')).toBeInTheDocument();
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(
      screen.getByText('2020-11-20T08:30:00.000+00:00')
    ).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});
