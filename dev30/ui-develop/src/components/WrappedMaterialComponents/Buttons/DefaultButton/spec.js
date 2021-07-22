import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './index';

describe('expected Button behavior', () => {
  it('should render the component Button when loaded', () => {
    expect.assertions(1);
    const mockFunc = jest.fn();
    render(<Button className="anyName" label="label" onClick={mockFunc} />);
    expect(screen.getByText('label')).toBeInTheDocument();
  });

  it('should call the mocked function when the Button is clicked', () => {
    expect.assertions(1);
    const mockFunc = jest.fn();
    render(<Button className="anyName" label="label" onClick={mockFunc} />);
    fireEvent.click(screen.getByText('label'));
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
