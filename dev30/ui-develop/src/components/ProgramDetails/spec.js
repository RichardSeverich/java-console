import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgramDetails from './index';

describe('programDetails is a component for view program details', () => {
  const mockId = 14;
  const mockName = 'DEV30';
  const mockStartDate = '2020-01-01';
  const mockEndDate = '2020-10-01';
  const mockDescription = 'description of dev-30 program';
  it('should render the component ProgramDetails when loaded', () => {
    expect.assertions(2);
    render(
      <ProgramDetails
        programId={mockId}
        name={mockName}
        description={mockDescription}
        startDate={mockStartDate}
        endDate={mockEndDate}
      />
    );
    expect(screen.getByText('DEV30')).toBeInTheDocument();
    expect(
      screen.getByText('description of dev-30 program')
    ).toBeInTheDocument();
  });
});
