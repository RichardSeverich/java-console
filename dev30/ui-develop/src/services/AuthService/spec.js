import authService from 'app/services/AuthService';
import jwtDecode from 'jwt-decode';

jest.mock('jwt-decode');

describe('auth service test', () => {
  it('should return decoded when docode function is called', () => {
    expect.assertions(1);
    jwtDecode.mockImplementation(() => {
      return 'decoded';
    });
    expect(authService.decodeToken('encoded')).toStrictEqual('decoded');
  });
});
