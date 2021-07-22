import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchTextField from './index.js';

describe('expected SearchTextfield behavior', () => {
  it('should render the results of the search when the user stops typing', () => {
    expect.assertions(2);
    const id = 'idTextField';
    const className = 'classInput';
    const label = 'Search...';
    const result = [
      { id: 3, name: 'Daniel Lopez' },
      { id: 5, name: 'David Ruiz' },
    ];
    const mockOnChange = jest.fn();
    render(
      <SearchTextField
        id={id}
        result={result}
        className={className}
        label={label}
        onChange={mockOnChange}
      />
    );
    fireEvent.change(screen.getByLabelText(label), {
      target: { value: 'Da' },
    });
    expect(screen.getByText('Daniel Lopez')).toBeInTheDocument();
    expect(screen.getByText('David Ruiz')).toBeInTheDocument();
  });
});
