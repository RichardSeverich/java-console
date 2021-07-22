import React from 'react';
import {
  render,
  fireEvent,
  screen,
  queryByAttribute,
} from '@testing-library/react';
import ChangePass from './index';

describe('changePassword component test', () => {
  it('should render component with error message adress', () => {
    expect.assertions(1);
    const mockErrorMessage = 'Error';
    const mockEmail = 'EmailAdress';
    const mockTextChange = jest.fn();
    const mockClickButton = jest.fn();
    render(
      <ChangePass
        errorMessage={mockErrorMessage}
        username={mockEmail}
        handleTextChange={mockTextChange}
        handleButtonClick={mockClickButton}
      />
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
  it('should render component with username/email adress', () => {
    expect.assertions(1);
    const mockErrorMessage = '';
    const mockEmail = 'EmailAdress';
    const mockTextChange = jest.fn();
    const mockClickButton = jest.fn();
    render(
      <ChangePass
        errorMessage={mockErrorMessage}
        username={mockEmail}
        handleTextChange={mockTextChange}
        handleButtonClick={mockClickButton}
      />
    );
    expect(screen.getByText('User: EmailAdress')).toBeInTheDocument();
  });

  it('test for text changes on the password fields', () => {
    expect.assertions(1);
    const mockErrorMessage = '';
    const mockEmail = 'EmailAdress';
    const mockTextChange = jest.fn(() => jest.fn());
    const mockClickButton = jest.fn();
    const dom = render(
      <ChangePass
        errorMessage={mockErrorMessage}
        username={mockEmail}
        handleTextChange={mockTextChange}
        handleButtonClick={mockClickButton}
      />
    );
    const getById = queryByAttribute.bind(null, 'id');
    const passInput = getById(dom.container, 'Current Password');
    fireEvent.change(passInput, {
      target: { value: '123456' },
    });
    expect(mockTextChange).toHaveBeenCalledTimes(3);
  });
  it('calls the function assigned to click button', () => {
    expect.assertions(1);
    const mockErrorMessage = '';
    const mockEmail = 'EmailAdress';
    const mockTextChange = jest.fn(() => jest.fn());
    const mockClickButton = jest.fn();
    render(
      <ChangePass
        errorMessage={mockErrorMessage}
        username={mockEmail}
        handleTextChange={mockTextChange}
        handleButtonClick={mockClickButton}
      />
    );
    fireEvent.click(screen.getByText('Update password'));
    expect(mockClickButton).toHaveBeenCalledTimes(1);
  });
});
