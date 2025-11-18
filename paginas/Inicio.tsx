import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, ShieldCheck, Users } from 'lucide-react';

interface InicioProps {
  navegarPara: (aba: string) => void;
}

const Inicio: React.FC<InicioProps> = ({ navegarPara }) => {
  const [saudacao, setSaudacao] = useState('');

  useEffect(() => {
    const hora = new Date().getHours();
    if (hora < 12) setSaudacao('Bom dia');
    else if (hora < 18) setSaudacao('Boa tarde');
    else setSaudacao('Boa noite');
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-pink-400 to-white rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{saudacao}, seja bem-vinde!</h2>
          <p className="text-lg md:text-xl opacity-95 mb-8 font-medium shadow-black/10 drop-shadow-md">
            Este é o seu espaço seguro. Encontre informações confiáveis sobre seus direitos, saúde e oportunidades. Você não está só.
          </p>
          <button 
            onClick={() => navegarPara('chat')}
            className="bg-white text-pink-600 px-6 py-3 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-md flex items-center gap-2"
          >
            Conversar com a Assistente <ArrowRight size={18} />
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 transform skew-x-12 mix-blend-overlay"></div>
      </section>

      {/* Cards de Acesso Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => navegarPara('legal')}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Guia de Retificação</h3>
          <p className="text-slate-600 text-sm">Passo a passo atualizado para mudança de nome e gênero nos documentos.</p>
        </div>

        <div 
          onClick={() => navegarPara('saude')}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
            <Heart size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Saúde e Hormonização</h3>
          <p className="text-slate-600 text-sm">Entenda o processo transexualizador do SUS e encontre especialistas.</p>
        </div>

        <div 
          onClick={() => navegarPara('oportunidades')}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Comunidade e Vagas</h3>
          <p className="text-slate-600 text-sm">Oportunidades de emprego inclusivas, cursos e cotas universitárias.</p>
        </div>
      </div>

      {/* Seção Informativa Rápida */}
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Destaque Legal: STF e Identidade de Gênero</h3>
        <p className="text-slate-600 mb-4 leading-relaxed">
          No Brasil, o direito à identidade de gênero é reconhecido pelo STF. Desde 2018, pessoas trans podem alterar o prenome e o gênero no registro civil diretamente em cartório, sem necessidade de cirurgia, laudo médico ou autorização judicial (Provimento nº 73/2018 do CNJ).
        </p>
        <button 
          onClick={() => navegarPara('legal')}
          className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
        >
          Saiba como fazer &rarr;
        </button>
      </div>
    </div>
  );
};

export default Inicio;