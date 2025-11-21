import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onNavigate: (id: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header id="header" className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <span className="text-xl font-bold text-brand-dark">BotWise</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavigate('hero')} className="text-gray-700 hover:text-brand-dark transition font-medium">Главная</button>
          <button onClick={() => handleNavigate('bento-grid')} className="text-gray-700 hover:text-brand-dark transition font-medium">Демо</button>
          <button onClick={() => handleNavigate('cases')} className="text-gray-700 hover:text-brand-dark transition font-medium">Кейсы</button>
          <button onClick={() => handleNavigate('results')} className="text-gray-700 hover:text-brand-dark transition font-medium">Результаты</button>
          <Button onClick={() => handleNavigate('cta')} className="bg-brand-dark text-white hover:bg-brand-dark/90 font-semibold rounded-xl px-6">
            Связаться
          </Button>
        </nav>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-brand-dark">
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button onClick={() => handleNavigate('hero')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Главная</button>
            <button onClick={() => handleNavigate('bento-grid')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Демо</button>
            <button onClick={() => handleNavigate('cases')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Кейсы</button>
            <button onClick={() => handleNavigate('results')} className="text-gray-700 hover:text-brand-dark transition text-left font-medium">Результаты</button>
            <Button onClick={() => handleNavigate('cta')} className="bg-brand-dark text-white hover:bg-brand-dark/90 font-semibold rounded-xl">
              Связаться
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
