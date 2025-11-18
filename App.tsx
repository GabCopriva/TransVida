import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import BarraLateral from './componentes/BarraLateral';
import Inicio from './paginas/Inicio';
import GuiaLegal from './paginas/GuiaLegal';
import Saude from './paginas/Saude';
import Oportunidades from './paginas/Oportunidades';
import ChatIA from './componentes/ChatIA';

const App: React.FC = () => {
  const [abaAtiva, setAbaAtiva] = useState('inicio');
  const [menuAberto, setMenuAberto] = useState(false);

  const renderizarConteudo = () => {
    switch (abaAtiva) {
      case 'inicio':
        return <Inicio navegarPara={setAbaAtiva} />;
      case 'legal':
        return <GuiaLegal />;
      case 'saude':
        return <Saude />;
      case 'oportunidades':
      case 'noticias':
        return <Oportunidades />;
      case 'chat':
        return <ChatIA />;
      default:
        return <Inicio navegarPara={setAbaAtiva} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <BarraLateral 
        abaAtiva={abaAtiva} 
        setAbaAtiva={setAbaAtiva} 
        isOpen={menuAberto}
        setIsOpen={setMenuAberto}
      />

      {/* Área Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="font-bold text-slate-800">TransVida</span>
          </div>
          <button onClick={() => setMenuAberto(true)} className="text-slate-600">
            <Menu size={24} />
          </button>
        </div>

        {/* Conteúdo Scrollável */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          {renderizarConteudo()}
        </div>
      </main>
    </div>
  );
};

export default App;