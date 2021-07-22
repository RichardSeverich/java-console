import React from 'react';
import { render, screen } from '@testing-library/react';
import InputDate from './index';

describe('expected InputDate behavior', () => {
  const id = 'id';
  const value = '2021-01-15';
  const className = 'className';
  const min = '2021-01-10';
  const max = '2021-01-20';
  const mockOnChange = jest.fn();
  it('should render the component InputDate when loaded', () => {
    expect.assertions(3);
    render(
      <InputDate
        id={id}
        value={value}
        className={className}
        min={min}
        max={max}
        onChange={mockOnChange}
      />
    );
    document.getElementById('id-date').value = { value };
    expect(screen.getByDisplayValue('')).toHaveAttribute('value', '2021-01-15');
    expect(screen.getByDisplayValue('')).toHaveAttribute('min', '2021-01-10');
    expect(screen.getByDisplayValue('')).toHaveAttribute('max', '2021-01-20');
  });
  it('should render the component with empty input date when loaded', () => {
    expect.assertions(1);
    const min = '';
    render(<InputDate id={id} className={className} min={min} max={max} />);
    document.getElementById('id-date').value = { value };
    expect(screen.getByDisplayValue('')).toHaveAttribute('value', '');
  });
});
