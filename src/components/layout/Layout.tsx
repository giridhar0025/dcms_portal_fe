import { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} onToggle={() => setOpen(!open)} />
      <div className="flex-1 flex flex-col">
        <Header onToggle={() => setOpen(!open)} />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
