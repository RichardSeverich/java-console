import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './index';

describe('alert component tests', () => {
  it('should render the component Alert with a message when loaded', () => {
    expect.assertions(1);
    render(<Alert severity="error" message="Message" />);
    expect(screen.getByText('Message')).toBeInTheDocument();
  });
});
