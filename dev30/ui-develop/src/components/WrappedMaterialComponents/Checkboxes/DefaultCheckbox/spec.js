import React from 'react';
import { render, screen } from '@testing-library/react';
import DefaultCheckbox from './index';

describe('<DefaultCheckbox />', () => {
  it('should render the component <DefaultCheckbox /> when loaded', () => {
    expect.assertions(1);
    const label = 'true';
    render(<DefaultCheckbox label={label} />);
    expect(screen.getByText('true')).toBeInTheDocument();
  });
  it('should render the component <DefaultCheckbox /> with elements when loaded', () => {
    expect.assertions(1);
    render(<DefaultCheckbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
