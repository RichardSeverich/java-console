import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidatesHistory from './index';

describe('candidatesHistory is a component for view all programs related to a candidate', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(2);
    const historyCandidateMockList = [
      {
        id: 1,
        program: 'DEV-30',
        status: 'ACTIVE',
      },
      {
        id: 2,
        program: 'DEV-31',
        status: 'DISMISSED',
      },
      {
        id: 3,
        program: 'AT-5',
        status: 'DISMISSED',
      },
    ];

    render(<CandidatesHistory history={historyCandidateMockList} />);
    expect(screen.getByText('DEV-30 (ACTIVE)')).toBeInTheDocument();
    expect(screen.getByText('AT-5 (DISMISSED)')).toBeInTheDocument();
  });
});
