import { type Page } from "../App";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: string }[] = [
  { page: "home", label: "Главная", icon: "🏠" },
  { page: "stages", label: "Этапы", icon: "📋" },
  { page: "glossary", label: "Глоссарий", icon: "📖" },
  { page: "quiz", label: "Тесты", icon: "🧪" },
  { page: "configurator", label: "Конфигуратор", icon: "⚙️" },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all"
        >
          <span className="text-2xl">🚀</span>
          DevPath
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === item.page
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="mr-1.5">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`p-2 rounded-lg text-lg transition-all ${
                currentPage === item.page
                  ? "bg-indigo-500/20 scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
