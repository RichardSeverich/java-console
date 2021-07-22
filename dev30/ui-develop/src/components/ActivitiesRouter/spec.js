import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActivitiesRouterComponent from './index';

describe('activities Router tests', () => {
  it('should renders correctly the buttons of Activities module', () => {
    expect.assertions(1);
    render(
      <MemoryRouter initialEntries={['/home/activities']}>
        <ActivitiesRouterComponent />
      </MemoryRouter>
    );
    expect(screen.getByText('design')).toBeInTheDocument();
  });
});
