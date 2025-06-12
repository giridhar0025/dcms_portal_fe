import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
  return (
    <aside
      className={`${open ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 font-bold flex justify-between items-center">
        <span>Menu</span>
        <button className="hidden md:block" onClick={onToggle} aria-label="toggle sidebar">
          ☰
        </button>
      </div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link to="/" className="block px-4 py-2 hover:bg-gray-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
