import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomButton from './index';

describe('expected Button behavior', () => {
  it('should render the component CustomButton when loaded', () => {
    expect.assertions(1);
    const mockFunc = jest.fn();
    const className = 'anyName';
    const label = 'label';
    render(
      <CustomButton className={className} label={label} onClick={mockFunc} />
    );
    expect(screen.getByText('label')).toBeInTheDocument();
  });

  it('should call the mocked function when the CustomButton is clicked', () => {
    expect.assertions(2);
    const mockFunc = jest.fn();
    const className = 'anyName';
    const label = 'label';
    render(
      <CustomButton className={className} label={label} onClick={mockFunc} />
    );
    fireEvent.click(screen.getByText('label'));
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc.mock.calls).toHaveLength(1);
  });
});
