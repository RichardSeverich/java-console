import React from 'react';
import { render, screen } from '@testing-library/react';
import Program from 'app/mappers/Program';
import SingleProgramDesign from './index';

describe('singleProgramDesign is a component for view all program design informacion', () => {
  it('should render the component SingleProgramDesign when loaded', () => {
    expect.assertions(1);
    const mockProgramList = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 31, 'AT', 'Dev 31 description'),
    ];
    const mockProgram = { id: 12, name: 'DEV 30' };
    render(
      <SingleProgramDesign
        selectedProgram={mockProgram}
        programs={mockProgramList}
      />
    );
    expect(screen.getByText('DEV 30')).toBeInTheDocument();
  });
});
