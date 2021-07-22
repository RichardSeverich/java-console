import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UsersRouterComponent from './index';

describe('users Router tests', () => {
  it('should renders correctly the button of Users module', () => {
    expect.hasAssertions();
    render(
      <MemoryRouter initialEntries={['/home/users']}>
        <UsersRouterComponent />
      </MemoryRouter>
    );
    expect(screen.getByText('manage')).toBeInTheDocument();
  });
});
