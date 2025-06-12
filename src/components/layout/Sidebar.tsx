import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { label: 'Users', to: '/users', icon: UserIcon },
  { label: 'Reports', to: '/reports', icon: DocumentTextIcon },
  { label: 'Analytics', to: '/analytics', icon: ChartBarIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="group h-screen bg-white border-r shadow-sm relative transition-all duration-300 w-16 hover:w-64">
      {/* Logo */}
      <div className="flex items-center justify-center p-4">
        <img src="src/assets/dentistry.png" alt="Logo" className="w-8 h-8" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2 px-2">
        {navItems.map(({ label, to, icon: Icon }) => {
          const isActive = location.pathname === to;

          return (
            <Link
              key={label}
              to={to}
              className={clsx(
                'flex items-center gap-3 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-100',
                isActive ? 'bg-gray-100 text-black' : 'text-gray-700'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="overflow-hidden whitespace-nowrap transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:ml-2">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
