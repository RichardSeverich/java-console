import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StagesRouterComponent from 'components/StagesRouter';

describe('stages component testing', () => {
  it('test the correct rendering of the submenu of stage', () => {
    expect.assertions(1);
    render(
      <MemoryRouter initialEntries={['/home/stages']}>
        <StagesRouterComponent />
      </MemoryRouter>
    );
    expect(screen.getByText('design')).toBeInTheDocument();
  });
});
