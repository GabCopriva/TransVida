import React from 'react';
import { Home, Scale, Heart, Briefcase, Newspaper, MessageCircle, Menu, X } from 'lucide-react';

interface BarraLateralProps {
  abaAtiva: string;
  setAbaAtiva: (aba: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const itensMenu = [
  { id: 'inicio', label: 'Início', icon: Home },
  { id: 'legal', label: 'Guia Legal', icon: Scale },
  { id: 'saude', label: 'Saúde & SUS', icon: Heart },
  { id: 'oportunidades', label: 'Oportunidades', icon: Briefcase },
  { id: 'noticias', label: 'Notícias', icon: Newspaper },
  { id: 'chat', label: 'Assistente IA', icon: MessageCircle },
];

const BarraLateral: React.FC<BarraLateralProps> = ({ abaAtiva, setAbaAtiva, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 flex flex-col
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-300 via-pink-300 to-white flex items-center justify-center text-white font-bold shadow-sm">
              T
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
              TransVida
            </h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {itensMenu.map((item) => {
            const Icon = item.icon;
            const ativo = abaAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setAbaAtiva(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${ativo 
                    ? 'bg-blue-50 text-blue-600 shadow-sm font-medium' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <Icon size={20} className={ativo ? 'text-blue-500' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-gradient-to-r from-blue-100 to-pink-100 p-4 rounded-xl">
            <p className="text-xs text-slate-600 font-medium mb-1">Precisa de ajuda urgente?</p>
            <p className="text-sm font-bold text-slate-800">Ligue 188 (CVV)</p>
            <p className="text-xs text-slate-500 mt-1">Apoio emocional 24h</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarraLateral;