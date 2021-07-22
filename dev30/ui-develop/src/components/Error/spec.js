import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorComponent from './index';

describe('error component tests', () => {
  it('display a sent error and message', () => {
    expect.assertions(2);
    const mockErrorCode = '404';
    const mockErrorMessage = 'Something went wrong';
    render(<ErrorComponent code={mockErrorCode} message={mockErrorMessage} />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('display the correct message corresponding to the code', () => {
    expect.assertions(2);
    const mockErrorCode = '400';
    const mockErrorMessage = '';
    render(<ErrorComponent code={mockErrorCode} message={mockErrorMessage} />);
    expect(screen.getByText('400')).toBeInTheDocument();
    expect(screen.getByText('Bad Request')).toBeInTheDocument();
  });
});
