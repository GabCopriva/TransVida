import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { MensagemChat } from '../tipos';
import { enviarMensagemChat } from '../servicos/gemini';

const ChatIA: React.FC = () => {
  const [mensagens, setMensagens] = useState<MensagemChat[]>([
    {
      id: '1',
      role: 'model',
      texto: 'Olá! Eu sou a Aria, sua assistente virtual. Estou aqui para tirar dúvidas sobre retificação de nome, saúde (hormônios/cirurgias), direitos e o que mais precisar. Como posso ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);

  const rolarParaFim = () => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    rolarParaFim();
  }, [mensagens]);

  const enviar = async () => {
    if (!input.trim() || carregando) return;

    const textoUsuario = input;
    setInput('');
    const novaMsgUsuario: MensagemChat = {
      id: Date.now().toString(),
      role: 'user',
      texto: textoUsuario,
      timestamp: new Date()
    };

    setMensagens(prev => [...prev, novaMsgUsuario]);
    setCarregando(true);

    const respostaIA = await enviarMensagemChat(mensagens, textoUsuario);
    
    setMensagens(prev => [...prev, respostaIA]);
    setCarregando(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
      {/* Header do Chat */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Aria (Assistente Virtual)</h3>
          <p className="text-xs text-slate-500">Especialista em direitos e saúde trans</p>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {mensagens.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${isUser ? 'bg-slate-200 text-slate-600' : 'bg-pink-100 text-pink-600'}`}>
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isUser 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  <p style={{whiteSpace: 'pre-wrap'}}>{msg.texto}</p>
                  <span className={`text-[10px] block mt-2 opacity-70 ${isUser ? 'text-blue-100' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {carregando && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-2 items-center">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
        <div ref={fimRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2 items-center relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviar()}
            placeholder="Digite sua dúvida..."
            disabled={carregando}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button 
            onClick={enviar}
            disabled={!input.trim() || carregando}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          A IA pode cometer erros. Verifique informações médicas e legais importantes.
        </p>
      </div>
    </div>
  );
};

export default ChatIA;