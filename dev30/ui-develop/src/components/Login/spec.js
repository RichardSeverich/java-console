import React from 'react';
import {
  render,
  fireEvent,
  screen,
  queryByAttribute,
} from '@testing-library/react';
import Login from './index';

describe('login is the front page of the system, will recieve a single Login function', () => {
  it('should render the component with elements when loaded', () => {
    expect.assertions(4);
    const mockErrorCode = '';
    const mockErrorMessage = '';
    const mockOnTextChange = jest.fn(() => jest.fn(() => {}));
    const mockLogin = jest.fn();
    const mockRemember = jest.fn();
    const mockSignUp = jest.fn();
    render(
      <Login
        errorStatus={mockErrorCode}
        errorMessage={mockErrorMessage}
        onTextChange={mockOnTextChange}
        handleRemember={mockRemember}
        handleLogin={mockLogin}
        handleSingUp={mockSignUp}
      />
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Remember Me')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  it('should render the error message if there is a code when loaded', () => {
    expect.assertions(1);
    const mockErrorCode = '404';
    const mockErrorMessage = 'Error Message';
    const mockOnTextChange = jest.fn(() => jest.fn(() => {}));
    const mockLogin = jest.fn();
    const mockRemember = jest.fn();
    const mockSignUp = jest.fn();
    render(
      <Login
        errorStatus={mockErrorCode}
        errorMessage={mockErrorMessage}
        onTextChange={mockOnTextChange}
        handleRemember={mockRemember}
        handleLogin={mockLogin}
        handleSingUp={mockSignUp}
      />
    );
    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });
  it('login should be called', () => {
    expect.assertions(1);
    const mockErrorCode = '';
    const mockErrorMessage = '';
    const mockOnTextChange = jest.fn(() => jest.fn(() => {}));
    const mockLogin = jest.fn();
    const mockRemember = jest.fn();
    const mockSignUp = jest.fn();
    const dom = render(
      <Login
        errorStatus={mockErrorCode}
        errorMessage={mockErrorMessage}
        onTextChange={mockOnTextChange}
        handleRemember={mockRemember}
        handleLogin={mockLogin}
        handleSingUp={mockSignUp}
      />
    );
    fireEvent.change(screen.getByLabelText('JALA Foundation Email'), {
      target: { value: 'luis@fundacion-jala.org' },
    });
    const getById = queryByAttribute.bind(null, 'id');
    const passInput = getById(dom.container, 'Password');
    fireEvent.change(passInput, {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Sign In'));
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
  it('text change should be called when text field are changed', () => {
    expect.assertions(1);
    const mockErrorCode = '';
    const mockErrorMessage = '';
    const mockOnTextChange = jest.fn(() => jest.fn(() => {}));
    const mockLogin = jest.fn();
    const mockRemember = jest.fn();
    const mockSignUp = jest.fn();
    const dom = render(
      <Login
        errorStatus={mockErrorCode}
        errorMessage={mockErrorMessage}
        onTextChange={mockOnTextChange}
        handleRemember={mockRemember}
        handleLogin={mockLogin}
        handleSingUp={mockSignUp}
      />
    );
    fireEvent.change(screen.getByLabelText('JALA Foundation Email'), {
      target: { value: 'luis@fundacion-jala.org' },
    });
    const getById = queryByAttribute.bind(null, 'id');
    const passInput = getById(dom.container, 'Password');
    fireEvent.change(passInput, {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Sign In'));
    expect(mockOnTextChange).toHaveBeenCalledWith('username');
  });
  it('remember me mock function should be called', () => {
    expect.assertions(1);
    const mockErrorCode = '';
    const mockErrorMessage = '';
    const mockOnTextChange = jest.fn(() => jest.fn(() => {}));
    const mockLogin = jest.fn();
    const mockRemember = jest.fn();
    const mockSignUp = jest.fn();
    const dom = render(
      <Login
        errorStatus={mockErrorCode}
        errorMessage={mockErrorMessage}
        onTextChange={mockOnTextChange}
        handleRemember={mockRemember}
        handleLogin={mockLogin}
        handleSingUp={mockSignUp}
      />
    );
    fireEvent.change(screen.getByLabelText('JALA Foundation Email'), {
      target: { value: 'luis@fundacion-jala.org' },
    });
    const getById = queryByAttribute.bind(null, 'id');
    const passInput = getById(dom.container, 'Password');
    fireEvent.change(passInput, {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Remember Me'));
    expect(mockRemember).toHaveBeenCalledTimes(1);
  });
});
