import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProgramsComponent from './index';

describe('programs component testing', () => {
  it('test the correct rendering of the buttons', () => {
    expect.assertions(3);
    render(
      <MemoryRouter initialEntries={['/home/programs/progress']}>
        <ProgramsComponent selectedProgram={{ id: 1, name: 'DEVINT-30' }} />
      </MemoryRouter>
    );
    expect(screen.getByText('progress')).toBeInTheDocument();
    expect(screen.getByText('statistics')).toBeInTheDocument();
    expect(screen.getByText('design')).toBeInTheDocument();
  });
});
