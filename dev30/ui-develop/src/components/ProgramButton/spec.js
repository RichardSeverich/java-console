import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Program from 'app/mappers/Program';
import ProgramButton from './index';

describe('test the program buttons', () => {
  it('should render the component ProgramButton when loaded', () => {
    expect.assertions(2);
    const mockProgram = new Program(1, 30, 'DEV', 'Dev 30 description');
    const mockOnClick = jest.fn();
    render(<ProgramButton program={mockProgram} onClick={mockOnClick} />);
    expect(screen.getByText('DEV')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should call the mocked function on click of the component ProgramButton', () => {
    expect.assertions(1);
    const mockProgram = new Program(1, 30, 'DEV', 'Dev 30 description');
    const mockOnClick = jest.fn();
    render(<ProgramButton program={mockProgram} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('DEV'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
