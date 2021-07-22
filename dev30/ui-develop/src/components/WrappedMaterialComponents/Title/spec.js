import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from 'components/WrappedMaterialComponents/Title';

describe('expected Title behavior', () => {
  it('should render the component Title when click in button', () => {
    expect.assertions(1);
    const nameProgram = 'nameProgram';
    const className = 'nameProgram';
    const size = 'h4';
    const name = 'DEV 30';

    render(
      <Title
        className={className}
        id={nameProgram}
        variant={size}
        label={name}
      />
    );
    expect(screen.getByTestId(nameProgram)).toBeInTheDocument();
  });
});
