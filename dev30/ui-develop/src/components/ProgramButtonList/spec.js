import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgramButtonList from 'app/components/ProgramButtonList';
import Program from 'app/mappers/Program';

describe('test the program list buttons', () => {
  it('should render the component ProgramButton when loaded', () => {
    expect.assertions(4);
    const mockProgramList = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 31, 'AT', 'Dev 31 description'),
    ];
    const mockSelectedProgram = { id: 1 };
    render(
      <ProgramButtonList
        programs={mockProgramList}
        selectedProgram={mockSelectedProgram}
      />
    );
    expect(screen.getByText('DEV')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('AT')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
  });
});
