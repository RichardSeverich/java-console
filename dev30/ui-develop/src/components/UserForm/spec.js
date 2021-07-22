import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UserForm from './index';

describe('expected UserForm behaviour', () => {
  it('the email of the user sent should be displayed', () => {
    expect.assertions(1);
    const mockClassName = 'className';
    const mockLogout = jest.fn();
    const tempUser = 'luis@gmail.com';
    render(
      <UserForm className={mockClassName} user={tempUser} logout={mockLogout} />
    );
    expect(screen.getByText('luis@gmail.com')).toBeInTheDocument();
  });
  it('should call the logout function when the button is clicked', () => {
    expect.assertions(1);
    const mockClassName = 'className';
    const mockLogout = jest.fn();
    const tempUser = 'luis@gmail.com';
    render(
      <UserForm className={mockClassName} user={tempUser} logout={mockLogout} />
    );
    fireEvent.click(screen.getByText('Log out'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
