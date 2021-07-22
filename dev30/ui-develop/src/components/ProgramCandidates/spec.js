import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgramCandidates from './index';

describe('programCandidates is a component for view all candidates about a program', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(2);
    const mockCandidatesList = [
      {
        id: 1,
        fullName: 'Dennis Padilla',
        email: 'dennis.padilla@gmail.com',
        cellPhone: '75915465',
        lastActivity: '',
        status: 'Active',
      },
    ];

    const mockCountCandidates = {
      active: 3,
      dismissed: 1,
      licensed: 1,
    };

    const mockCheckStatus = {
      active: true,
      dismissed: false,
      licensed: true,
    };

    render(
      <ProgramCandidates
        candidates={mockCandidatesList}
        countCandidates={mockCountCandidates}
        checkStatus={mockCheckStatus}
      />
    );
    expect(screen.getByText('Candidates')).toBeInTheDocument();
    expect(screen.getByText('Dennis Padilla')).toBeInTheDocument();
  });
});
