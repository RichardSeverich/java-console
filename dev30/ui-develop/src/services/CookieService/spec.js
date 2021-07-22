import cookie from 'js-cookie';
import cookieService from 'app/services/CookieService';

describe('cookies service test', () => {
  it('should call save method', () => {
    expect.assertions(3);
    jest.spyOn(cookie, 'set').mockImplementation();
    cookieService.saveCookie('token', 'token');
    cookieService.saveCookie('key', 'value');
    expect(cookie.set).toHaveBeenCalledTimes(2);
    expect(cookie.set).toHaveBeenCalledWith('token', 'token');
    expect(cookie.set).toHaveBeenCalledWith('key', 'value');
  });

  it('should show token result when getCookie is called', () => {
    expect.assertions(2);
    jest.spyOn(cookie, 'get').mockImplementation();
    cookie.get.mockImplementation(() => 'token result');
    const result = cookieService.getCookie('token');
    expect(result).toStrictEqual('token result');
    expect(cookie.get).toHaveBeenCalledWith('token');
  });

  it('should remove cookie when remove cookie function is called', () => {
    expect.assertions(1);
    const originalImplementation = cookie.save;
    jest.spyOn(cookie, 'set').mockImplementation(originalImplementation);
    cookieService.saveCookie('token', 'saved token');
    const { remove } = cookie;
    jest.spyOn(cookie, 'remove').mockImplementation(remove);
    cookieService.removeCookie('token');
    const tokenCookie = cookieService.getCookie('token');
    expect(tokenCookie).toBeUndefined();
  });
});
