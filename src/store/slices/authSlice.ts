import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';
import { Role } from '../../constants/roles';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('accessToken');
const initialState: AuthState = {
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
  accessToken: storedToken,
  status: 'idle',
  error: null
};

export const login = createAsyncThunk<
  { user: User; accessToken: string },
  { email: string; password: string },
  { rejectValue: string }
>(
  'https://dcms-portal-be.onrender.com/auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const loginRes = await axios.post(
        'https://dcms-portal-be.onrender.com/api/auth/login',
        credentials
      );
      const { accessToken } = loginRes.data;

      const userRes = await axios.get('https://dcms-portal-be.onrender.com/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return { user: userRes.data, accessToken };
    } catch (err: any) {
      const message =
        err.loginRes?.data?.message || err.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
