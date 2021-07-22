import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Program from 'app/mappers/Program';
import HomeComponent from './index';

describe('main display execution tests', () => {
  it('should render the component MainView when loaded', () => {
    expect.assertions(1);
    const mockUser = 'Username';
    const mockPrograms = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 10, 'AT', 'AT 10 description'),
      new Program(3, 23, 'MT', 'MT 23 description'),
    ];
    const mockLogout = jest.fn();
    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomeComponent
          user={mockUser}
          programs={mockPrograms}
          handleLogout={mockLogout}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
  });
  it('call the logout function when clicked logout button', () => {
    expect.assertions(1);
    const mockUser = 'Username';
    const mockPrograms = [
      new Program(1, 30, 'DEV', 'Dev 30 description'),
      new Program(2, 10, 'AT', 'AT 10 description'),
      new Program(3, 23, 'MT', 'MT 23 description'),
    ];
    const mockLogout = jest.fn();
    render(
      <MemoryRouter initialEntries={['/home']}>
        <HomeComponent
          user={mockUser}
          programs={mockPrograms}
          handleLogout={mockLogout}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Log out'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
