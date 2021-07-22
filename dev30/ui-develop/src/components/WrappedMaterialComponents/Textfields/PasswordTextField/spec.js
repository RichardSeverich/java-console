import React from 'react';
import {
  render,
  fireEvent,
  screen,
  queryByAttribute,
} from '@testing-library/react';
import PasswordTextfield from './index';

describe('expected password textfield behavior', () => {
  it('the onChange will be called for any password value', () => {
    expect.assertions(1);
    const className = 'className';
    const label = 'label';
    const mockOnChange = jest.fn();
    const dom = render(
      <PasswordTextfield
        className={className}
        label={label}
        id={label}
        onChange={mockOnChange}
      />
    );
    const getById = queryByAttribute.bind(null, 'id');
    const passInput = getById(dom.container, 'label');
    fireEvent.change(passInput, {
      target: { value: '123456' },
    });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
  it('should render the component with elements when loaded', () => {
    expect.assertions(1);
    render(<PasswordTextfield />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
