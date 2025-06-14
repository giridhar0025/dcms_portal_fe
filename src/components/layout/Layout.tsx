import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} onToggle={() => setOpen(!open)} />
      <div className="flex-1 flex flex-col">
        <Header onToggle={() => setOpen(!open)} />
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
