import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setCredentials, logout } from '../store/slices/authSlice';
import { Role } from '../constants/roles';
import createUserFromToken from '../utils/createUserFromToken';

jest.mock('../api/axiosInstance', () => ({
  __esModule: true,
  default: { get: jest.fn() }
}));

jest.mock('jwt-decode', () => ({
  __esModule: true,
  default: jest.fn()
}));

import axios from '../api/axiosInstance';
import jwtDecode from 'jwt-decode';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedJwtDecode = jwtDecode as jest.Mock;

describe('auth persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('persists and hydrates auth state', async () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    const user = {
      id: '1',
      name: 'Test',
      email: 'test@example.com',
      roles: [Role.Admin]
    };

    store.dispatch(setCredentials({ user, accessToken: 'token123' }));

    expect(localStorage.getItem('accessToken')).toBe('token123');
    expect(localStorage.getItem('user')).toContain('Test');

    const newStore = configureStore({ reducer: { auth: authReducer } });

    mockedJwtDecode.mockReturnValue({ userId: '1', roles: [Role.Admin] });
    mockedAxios.get.mockResolvedValue({ data: user });

    await createUserFromToken('token123', newStore.dispatch);

    expect(newStore.getState().auth.user?.name).toBe('Test');
    expect(newStore.getState().auth.accessToken).toBe('token123');

    newStore.dispatch(logout());
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
