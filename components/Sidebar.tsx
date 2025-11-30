import React from 'react';
import { Home, Search, Library, Sparkles, Music } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMobileMenuOpen, closeMobileMenu }) => {
  
  const navItems: { id: ViewState; label: string; icon: React.ElementType }[] = [
    { id: 'HOME', label: 'Home', icon: Home },
    { id: 'SEARCH', label: 'Search', icon: Search },
    { id: 'LIBRARY', label: 'Your Library', icon: Library },
    { id: 'AI_MOOD', label: 'AI DJ', icon: Sparkles },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    closeMobileMenu();
  };

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
    md:relative md:translate-x-0
    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            MelodyFlow
          </h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-600/10 text-indigo-400 border-r-2 border-indigo-500' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-slate-900 to-transparent">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">Upgrade to Premium</p>
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};
