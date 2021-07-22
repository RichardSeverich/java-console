import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import JalaEmail from './index';

describe('jalaEmailTextfield expected behaviour suite', () => {
  it('should not call onChange if the email is not a valid Jala foundation email', () => {
    expect.assertions(1);
    const className = 'className';
    const label = 'label';
    const mockOnChange = jest.fn();
    render(
      <JalaEmail className={className} label={label} onChange={mockOnChange} />
    );
    fireEvent.change(screen.getByLabelText(label), {
      target: { value: 'luis@gmail.com' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('');
  });
  it('should call onChange if the email is a valid Jala foundation email', () => {
    expect.assertions(1);
    const className = 'className';
    const label = 'label';
    const mockOnChange = jest.fn();
    render(
      <JalaEmail className={className} label={label} onChange={mockOnChange} />
    );
    fireEvent.change(screen.getByLabelText(label), {
      target: { value: 'luis@fundacion-jala.org' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('luis@fundacion-jala.org');
  });
  it('should render the component <EmailTextfield /> when loaded', () => {
    expect.assertions(1);
    const label = 'JalaEmail';
    render(<JalaEmail label={label} />);
    expect(screen.getByLabelText('JalaEmail')).toBeInTheDocument();
  });
});
