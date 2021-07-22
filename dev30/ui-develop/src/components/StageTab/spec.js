import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgramStage from 'app/mappers/ProgramStage';
import StageTag from './index';

describe('test the stages tab', () => {
  it('should render the stages tab component', () => {
    expect.assertions(1);
    const mockProgramStage = new ProgramStage(1, 1, 'step 1');
    const mockStartDate = '28-01-2020';
    render(
      <StageTag
        name={mockProgramStage.name}
        id={mockProgramStage.id}
        order={mockProgramStage.order}
        startDate={mockStartDate}
      />
    );
    expect(screen.getByText('step 1')).toBeInTheDocument();
  });
});
