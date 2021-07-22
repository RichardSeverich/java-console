import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgramStage from 'app/mappers/ProgramStage';
import ProgramStages from './index';

describe('programStages is a component for view all stages of a program design information', () => {
  it('should render the component ProgramStages when loaded', () => {
    expect.assertions(3);
    const mockProgramList = [
      new ProgramStage(1, 1, 'Introduction to Java', '2020-01-01'),
      new ProgramStage(2, 2, 'Java Exam', '2020-01-12'),
    ];
    const mockProgram = {
      id: 12,
      name: 'DEV 30',
      startDate: '2020-01-02',
      endDate: '2020-01-12',
    };
    render(
      <ProgramStages
        selectedProgram={mockProgram}
        programStages={mockProgramList}
      />
    );
    expect(screen.getByText('DEV 30')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('Introduction to Java')
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('Java Exam')).toBeInTheDocument();
  });
});
