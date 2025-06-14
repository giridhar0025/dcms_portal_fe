import jwtDecode from 'jwt-decode';
import axios from '../api/axiosInstance';
import { AppDispatch } from '../store';
import { setCredentials, User } from '../store/slices/authSlice';

interface TokenPayload {
  userId: string;
  roles: string[];
  [key: string]: any;
}

export const createUserFromToken = async (
  token: string,
  dispatch: AppDispatch
) => {
  const { userId, roles } = jwtDecode<TokenPayload>(token);
  const response = await axios.get<User>('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const user = { ...response.data, id: userId, roles };
  dispatch(setCredentials({ user, accessToken: token }));
};

export default createUserFromToken;
