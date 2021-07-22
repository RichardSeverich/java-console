import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar from './index';

describe('avatar is a component that displays a picture, or an initial', () => {
  it('should render the component Avatar when loaded', () => {
    expect.assertions(1);
    render(<Avatar email="luis@gmail.com" />);
    expect(screen.getByText('l')).toBeInTheDocument();
  });
});
