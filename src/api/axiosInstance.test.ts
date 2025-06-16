import axios from './axiosInstance';
import { store } from '../store';
import { setCredentials, logout } from '../store/slices/authSlice';

describe('axiosInstance request interceptor', () => {
  const originalAdapter = axios.defaults.adapter!;

  afterEach(() => {
    axios.defaults.adapter = originalAdapter;
    store.dispatch(logout());
  });

  test('adds Authorization header when token exists', async () => {
    const token = 'testtoken';
    store.dispatch(
      setCredentials({
        user: { id: '1', name: 'Test', email: 't@test.com', roles: [] },
        accessToken: token
      })
    );

    let capturedAuth: any = null;
    axios.defaults.adapter = (config) => {
      capturedAuth = config.headers?.Authorization;
      return Promise.resolve({
        data: null,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      });
    };

    await axios.get('/foo');
    expect(capturedAuth).toBe(`Bearer ${token}`);
  });
});
