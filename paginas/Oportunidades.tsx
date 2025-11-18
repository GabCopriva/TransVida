import React, { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, ExternalLink, RefreshCw } from 'lucide-react';
import { buscarNoticiasEOportunidades } from '../servicos/gemini';
import { ArtigoNoticia, VagaEmprego } from '../tipos';
import { VAGAS_DESTAQUE } from '../constantes';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Dados mockados para o gráfico (Requisito da prompt: d3/recharts)
const DADOS_GRAFICO = [
  { ano: '2020', vagas: 120 },
  { ano: '2021', vagas: 350 },
  { ano: '2022', vagas: 800 },
  { ano: '2023', vagas: 1500 },
  { ano: '2024', vagas: 2200 },
];

const Oportunidades: React.FC = () => {
  const [noticias, setNoticias] = useState<ArtigoNoticia[]>([]);
  const [loading, setLoading] = useState(false);
  const [abaInterna, setAbaInterna] = useState<'vagas' | 'noticias'>('vagas');

  const carregarNoticias = async () => {
    setLoading(true);
    const news = await buscarNoticiasEOportunidades("vagas emprego trans e cursos gratuitos");
    setNoticias(news);
    setLoading(false);
  };

  useEffect(() => {
    // Carrega notícias na primeira renderização se estiver na aba notícias
    if (abaInterna === 'noticias' && noticias.length === 0) {
      carregarNoticias();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abaInterna]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Oportunidades & Notícias</h2>
          <p className="text-slate-600">Vagas afirmativas, cursos, cotas e atualizações.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setAbaInterna('vagas')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${abaInterna === 'vagas' ? 'bg-white shadow text-blue-600' : 'text-slate-600'}`}
          >
            Vagas & Cursos
          </button>
          <button 
            onClick={() => setAbaInterna('noticias')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${abaInterna === 'noticias' ? 'bg-white shadow text-blue-600' : 'text-slate-600'}`}
          >
            Notícias
          </button>
        </div>
      </header>

      {abaInterna === 'vagas' ? (
        <div className="space-y-8">
          {/* Seção de Vagas em Destaque */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-700">
                <Briefcase size={20} className="text-blue-500" />
                Vagas Afirmativas
              </h3>
              {VAGAS_DESTAQUE.map(vaga => (
                <div key={vaga.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-800">{vaga.cargo}</h4>
                      <p className="text-sm text-slate-600">{vaga.empresa}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{vaga.tipo}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500">{vaga.local}</span>
                    <button className="text-blue-600 font-medium hover:underline">Aplicar</button>
                  </div>
                </div>
              ))}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
                <p className="text-sm text-blue-800">
                  Muitas universidades públicas possuem <strong>Cotas Trans</strong> para graduação e pós. Verifique os editais da UFBA, Unifesp, UFRJ e outras federais.
                </p>
              </div>
            </div>

            {/* Gráfico de Crescimento */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="font-bold text-lg mb-4 text-slate-700">Crescimento de Vagas Inclusivas (Estimativa)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DADOS_GRAFICO}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="ano" tick={{fontSize: 12}} stroke="#94a3b8" />
                    <YAxis tick={{fontSize: 12}} stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="vagas" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Vagas Ofertadas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">Dados ilustrativos sobre o mercado afirmativo.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-700">Últimas Notícias (Web)</h3>
            <button 
              onClick={carregarNoticias}
              disabled={loading}
              className="flex items-center gap-2 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Atualizar
            </button>
          </div>

          {loading && noticias.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-500">Buscando informações atualizadas...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {noticias.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded uppercase tracking-wide">
                      {item.fonte}
                    </span>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-500" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{item.titulo}</h4>
                  <p className="text-sm text-slate-600 line-clamp-2">{item.resumo}</p>
                </a>
              ))}
              {noticias.length === 0 && !loading && (
                <p className="col-span-2 text-center text-slate-500">Clique em "Atualizar" para carregar as notícias mais recentes.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Oportunidades;