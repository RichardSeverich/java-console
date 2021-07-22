import React from 'react';
import { render, screen } from '@testing-library/react';
import Textarea from './index';

describe('expected textarea behavior', () => {
  it('should render the component textarea when loaded', () => {
    expect.assertions(1);
    const id = 'id';
    const programDescription = 'description program DEV 30';

    render(<Textarea id={id} programDescription={programDescription} />);
    expect(screen.getByText('description program DEV 30')).toBeInTheDocument();
  });
});
