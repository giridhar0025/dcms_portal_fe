interface HeaderProps {
  onToggle: () => void;
}

export default function Header({ onToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 h-12 bg-white/70 backdrop-blur shadow">
      <button className="md:hidden" onClick={onToggle} aria-label="toggle sidebar">
        ☰
      </button>
      <div className="font-bold">MyApp</div>
      <div>User</div>
    </header>
  );
}
