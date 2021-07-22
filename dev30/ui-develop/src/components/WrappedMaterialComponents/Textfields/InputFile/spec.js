import React from 'react';
import { render, screen } from '@testing-library/react';
import InputFile from './index';

describe('expected InputFile behavior', () => {
  it('should render the component InputFile when loaded', () => {
    expect.assertions(1);
    const className = 'className';
    const id = 'id';
    const name = 'name';
    const type = 'file';
    const accept = '.csv';
    render(
      <InputFile
        id={id}
        className={className}
        name={name}
        type={type}
        accept={accept}
      />
    );
    document.getElementById('id').value = '';
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'file');
  });
});
