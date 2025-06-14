import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface Props {
  element: JSX.Element;
}

export default function PrivateRoute({ element }: Props) {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return token ? element : <Navigate to="/login" replace />;
}
