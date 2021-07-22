import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Textfield from './index';

describe('expected textfield behavior', () => {
  it('the onChange will be called for any value', () => {
    expect.assertions(1);
    const className = 'className';
    const label = 'label';
    const mockOnChange = jest.fn();
    render(
      <Textfield className={className} label={label} onChange={mockOnChange} />
    );
    fireEvent.change(screen.getByLabelText(label), {
      target: { value: 'Any value' },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
  it('should render the component <InputTextfield /> when loaded', () => {
    expect.assertions(1);
    const label = 'InputTextfield';
    render(<Textfield label={label} />);
    expect(screen.getByLabelText('InputTextfield')).toBeInTheDocument();
  });
});
