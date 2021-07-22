import React from 'react';
import { render, screen } from '@testing-library/react';
import InputText from './index';

describe('expected InputText behavior', () => {
  it('should render the component InputText when loaded', () => {
    expect.assertions(1);
    const className = 'className';
    const id = 'id';
    const text = 'text';
    render(
      <InputText id={id} className={className} value={text} minLength={3} />
    );
    expect(screen.getByDisplayValue('text')).toBeInTheDocument();
  });
});
