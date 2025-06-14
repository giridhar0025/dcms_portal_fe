import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RoleBasedRoute from './components/RoleBasedRoute';
import { appRoutes } from './routes/routeConfig';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/LoginPage'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {appRoutes.map(({ path, element, roles }) => (
            <Route
              key={path}
              path={path}
              element={<RoleBasedRoute element={element} allowedRoles={roles} />}
            />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}
