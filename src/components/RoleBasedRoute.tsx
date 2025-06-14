import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { Role } from '../constants/roles';

interface Props {
  element: JSX.Element;
  allowedRoles: Role[];
}

export default function RoleBasedRoute({ element, allowedRoles }: Props) {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role as Role | undefined;
  if (userRole && allowedRoles.includes(userRole)) {
    return element;
  }

  return <Navigate to="/dashboard" replace />;
}
