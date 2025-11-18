import React, { useState } from 'react';
import { CheckCircle, FileText, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { LISTA_DOCUMENTOS_RETIFICACAO } from '../constantes';

const GuiaLegal: React.FC = () => {
  const [passoAtivo, setPassoAtivo] = useState<number | null>(0);

  const togglePasso = (index: number) => {
    setPassoAtivo(passoAtivo === index ? null : index);
  };

  const passos = [
    {
      titulo: "1. Reúna os Documentos",
      conteudo: (
        <div className="space-y-3">
          <p className="text-slate-600">Você precisará solicitar uma série de certidões. A maioria pode ser emitida online.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {LISTA_DOCUMENTOS_RETIFICACAO.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-2 rounded">
                <FileText size={16} className="text-blue-500 mt-0.5 min-w-[16px]" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex gap-2 items-start mt-2">
            <AlertCircle size={18} className="text-yellow-600 mt-0.5" />
            <p className="text-xs text-yellow-700">
              Importante: As certidões devem ter sido emitidas há no máximo 30 ou 90 dias (dependendo do cartório). Verifique a validade antes de ir.
            </p>
          </div>
        </div>
      )
    },
    {
      titulo: "2. Vá ao Cartório de Registro Civil",
      conteudo: (
        <p className="text-slate-600">
          Com os documentos em mãos, dirija-se a qualquer Cartório de Registro Civil de Pessoas Naturais (RCPN). Não precisa ser onde você foi registrade ao nascer. Solicite a "Alteração de prenome e gênero". O procedimento é administrativo e sigiloso.
        </p>
      )
    },
    {
      titulo: "3. Custos e Gratuidade",
      conteudo: (
        <p className="text-slate-600">
          O procedimento tem um custo que varia por estado. Se você não tiver condições de pagar, pode solicitar a gratuidade de justiça declarando hipossuficiência (pobreza na forma da lei) diretamente no cartório. Alguns cartórios podem exigir comprovação, outros aceitam apenas a declaração.
        </p>
      )
    },
    {
      titulo: "4. Finalização e Novos Documentos",
      conteudo: (
        <p className="text-slate-600">
          Após a análise (que costuma levar alguns dias), o cartório fará a averbação. Com a nova Certidão de Nascimento em mãos, você deve atualizar todos os outros documentos (RG, CPF, Título de Eleitor, Passaporte, etc.) individualmente nos órgãos competentes.
        </p>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          Guia de Retificação Civil
        </h2>
        <p className="text-slate-600 mt-2">
          Entenda como alterar seu nome e gênero legalmente sem necessidade de processo judicial (Provimento 73/2018 do CNJ).
        </p>
      </header>

      <div className="space-y-4">
        {passos.map((passo, index) => (
          <div key={index} className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
            <button
              onClick={() => togglePasso(index)}
              className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-slate-800">{passo.titulo}</h3>
              {passoAtivo === index ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>
            
            {passoAtivo === index && (
              <div className="p-5 border-t border-slate-100 animate-fadeIn">
                {passo.conteudo}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h4 className="font-bold text-blue-800 mb-2">Nome Social</h4>
        <p className="text-blue-900 text-sm mb-3">
          Enquanto não realiza a retificação, você tem direito ao uso do <strong>Nome Social</strong> em órgãos públicos, escolas, universidades e no SUS (Decreto nº 8.727/2016).
        </p>
        <p className="text-blue-900 text-sm">
          Para incluir no RG (sem alterar a certidão), basta solicitar no momento da emissão do documento de identidade no órgão do seu estado (Poupatempo, Detran, Instituto de Identificação).
        </p>
      </div>
    </div>
  );
};

export default GuiaLegal;