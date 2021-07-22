import axios from 'axios';
import apiFactory from 'helpers/apiFactory';
import environment from 'app/environment';

jest.mock('axios');

describe('test api factory', () => {
  it('should create the empty axios factory instance with empty headers', () => {
    expect.assertions(1);
    axios.create.mockImplementation(() => environment.URL);
    expect(apiFactory.emptyAxiosFactory()).toStrictEqual(
      'http://localhost:9000/api/v1'
    );
  });

  it('should create the axios factory with Authorization in headers', async () => {
    expect.assertions(2);
    axios.create.mockImplementation(() => {
      return {
        url: environment.URL,
        headers: {
          Authorization: 'token',
        },
        interceptors: {
          response: {
            use: jest.fn(),
          },
        },
      };
    });
    expect(apiFactory.axiosFactory().url).toStrictEqual(
      'http://localhost:9000/api/v1'
    );
    expect(apiFactory.axiosFactory().headers).toStrictEqual({
      Authorization: 'token',
    });
  });

  it('should create the file axios factory wiht Authorization and Content-tpye in headers', () => {
    expect.assertions(1);
    axios.create.mockImplementation(() => {
      return {
        url: environment.URL,
        headers: {
          Authorization: 'token',
          'Content-type': 'multipart/form-data',
        },
        interceptors: {
          response: {
            use: jest.fn(),
          },
        },
      };
    });
    const axiosInstance = apiFactory.fileAxiosFactory();
    expect(axiosInstance.url).toStrictEqual('http://localhost:9000/api/v1');
  });
});
