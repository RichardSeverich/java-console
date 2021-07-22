import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CandidatesRouterComponent from './index';

describe('candidates Router tests', () => {
  it('should renders correctly the buttons of Candidates module', () => {
    expect.assertions(3);
    render(
      <MemoryRouter initialEntries={['/home/candidates']}>
        <CandidatesRouterComponent />
      </MemoryRouter>
    );
    expect(screen.getByText('profile')).toBeInTheDocument();
    expect(screen.getByText('statistics')).toBeInTheDocument();
    expect(screen.getByText('design')).toBeInTheDocument();
  });
});
