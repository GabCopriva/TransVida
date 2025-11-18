import React, { useState } from 'react';
import { MapPin, AlertTriangle, Phone, Search } from 'lucide-react';
import { HOSPITAIS_REFERENCIA } from '../constantes';
import { buscarLocaisSaude } from '../servicos/gemini';

const Saude: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [loadingLocais, setLoadingLocais] = useState(false);
  const [locaisEncontrados, setLocaisEncontrados] = useState<Array<{nome: string, endereco: string, url?: string}>>([]);
  const [msgBusca, setMsgBusca] = useState('');

  // Filtra a lista estática
  const hospitaisFiltrados = HOSPITAIS_REFERENCIA.filter(h => 
    h.cidade.toLowerCase().includes(busca.toLowerCase()) ||
    h.estado.toLowerCase().includes(busca.toLowerCase()) ||
    h.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleBuscarProximos = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo seu navegador.");
      return;
    }

    setLoadingLocais(true);
    setMsgBusca("Obtendo sua localização...");

    navigator.geolocation.getCurrentPosition(async (position) => {
      setMsgBusca("Consultando IA sobre locais amigáveis próximos...");
      const { latitude, longitude } = position.coords;
      
      const resultado = await buscarLocaisSaude(latitude, longitude);
      
      setLocaisEncontrados(resultado.locais);
      setMsgBusca(resultado.locais.length > 0 ? "Encontramos estes locais baseados no Google Maps:" : "Nenhum local específico encontrado nas redondezas pela IA.");
      setLoadingLocais(false);
    }, (error) => {
      console.error(error);
      setMsgBusca("Erro ao obter localização. Verifique as permissões.");
      setLoadingLocais(false);
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Saúde Integral & SUS</h2>
        <p className="text-slate-600">
          O Processo Transexualizador do SUS garante acesso a hormonização, cirurgias e acompanhamento multiprofissional gratuito.
        </p>
      </header>

      {/* Alerta Importante */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg flex gap-3">
        <AlertTriangle className="text-red-500 shrink-0" />
        <div>
          <h3 className="font-bold text-red-800 text-sm">Cuidado com a Automedicação</h3>
          <p className="text-red-700 text-sm mt-1">
            Hormônios são medicamentos sérios. O uso sem acompanhamento pode causar trombose, problemas hepáticos e cardíacos. Procure sempre um endocrinologista.
          </p>
        </div>
      </div>

      {/* Busca e IA Maps */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Lista Estática de Referência */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="text-blue-500" /> Centros de Referência (SUS)
          </h3>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Filtrar por cidade ou estado..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {hospitaisFiltrados.length > 0 ? hospitaisFiltrados.map(h => (
              <div key={h.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-slate-800">{h.nome}</h4>
                <p className="text-sm text-slate-600 mt-1">{h.cidade} - {h.estado}</p>
                <p className="text-xs text-slate-500 mt-2">{h.endereco}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {h.servicos.map(s => (
                    <span key={s} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-500 py-4">Nenhum centro de referência listado para esta busca.</p>
            )}
          </div>
        </div>

        {/* Busca Dinâmica com IA */}
        <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Buscar Profissionais Próximos</h3>
          <p className="text-sm text-slate-600 mb-6">
            Use a Inteligência Artificial para encontrar clínicas, UBSs ou consultórios próximos a você que sejam recomendados ou listados no Google Maps.
          </p>
          
          <button
            onClick={handleBuscarProximos}
            disabled={loadingLocais}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loadingLocais ? "Buscando..." : "Localizar Agora (GPS)"}
            {!loadingLocais && <MapPin size={18} />}
          </button>

          {msgBusca && (
            <div className="mt-4 text-sm text-slate-600 italic border-t border-blue-200 pt-2">
              {msgBusca}
            </div>
          )}

          {locaisEncontrados.length > 0 && (
            <div className="mt-4 space-y-2">
              {locaisEncontrados.map((local, idx) => (
                <a 
                  key={idx} 
                  href={local.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.nome)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-blue-400 transition-colors"
                >
                  <p className="font-medium text-blue-700 text-sm">{local.nome}</p>
                  <p className="text-xs text-slate-500 mt-1">Abrir no Maps &rarr;</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saude;