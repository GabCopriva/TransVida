import { GoogleGenAI, Type } from "@google/genai";
import { MensagemChat, ArtigoNoticia } from "../tipos";

// Inicialização segura
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODELO_PADRAO = 'gemini-2.5-flash';

/**
 * Busca notícias e oportunidades atuais usando Google Search Grounding
 */
export const buscarNoticiasEOportunidades = async (termo: string): Promise<ArtigoNoticia[]> => {
  try {
    const response = await ai.models.generateContent({
      model: MODELO_PADRAO,
      contents: `Encontre 5 notícias recentes, verídicas e positivas ou oportunidades (cursos, empregos, editais) focadas na comunidade transgênero no Brasil. O termo de busca é: "${termo}". Retorne apenas um resumo curto e o título.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const noticias: ArtigoNoticia[] = [];

    // O Google Search Grounding retorna chunks com web.uri e web.title
    // Vamos processar o texto gerado e associar com os links se possível, 
    // mas para simplificar neste exemplo, extraímos os links diretos do grounding.
    
    chunks.forEach((chunk) => {
      if (chunk.web) {
        noticias.push({
          titulo: chunk.web.title || "Notícia Relacionada",
          url: chunk.web.uri || "#",
          fonte: new URL(chunk.web.uri || "https://google.com").hostname,
          resumo: "Clique para ler a matéria completa na fonte original."
        });
      }
    });

    // Remove duplicatas baseadas na URL
    const noticiasUnicas = Array.from(new Map(noticias.map(item => [item.url, item])).values());
    return noticiasUnicas.slice(0, 6);

  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
};

/**
 * Chatbot Assistente com contexto do sistema focado em acolhimento e precisão
 */
export const enviarMensagemChat = async (historico: MensagemChat[], novaMensagem: string): Promise<MensagemChat> => {
  try {
    // Convertendo histórico para formato do Gemini (simplificado para sendMessage)
    // Na prática, o chat mantém o histórico, mas aqui vamos instanciar um novo chat ou usar generateContent se for stateless.
    // Vamos usar generateContent com systemInstruction para manter simples e robusto.

    const prompt = `
    Você é a "Aria", uma assistente virtual especializada em ajudar pessoas transgênero no Brasil.
    
    Diretrizes:
    1. Seja extremamente empática, respeitosa e acolhedora. Use linguagem neutra quando possível ou pergunte os pronomes se necessário.
    2. Forneça informações baseadas na legislação brasileira (STF, SUS).
    3. Sobre hormônios e cirurgias: ALERTA SEMPRE para procurar médicos e NÃO se automedicar.
    4. Se perguntarem sobre retificação de nome, explique os passos do provimento 73 do CNJ.
    
    Histórico recente:
    ${historico.slice(-3).map(m => `${m.role}: ${m.texto}`).join('\n')}
    
    Usuário: ${novaMensagem}
    `;

    const response = await ai.models.generateContent({
      model: MODELO_PADRAO,
      contents: prompt,
      config: {
        systemInstruction: "Você é um assistente especializado em direitos e saúde da população trans no Brasil.",
      }
    });

    return {
      id: Date.now().toString(),
      role: 'model',
      texto: response.text || "Desculpe, não consegui processar sua resposta agora.",
      timestamp: new Date()
    };

  } catch (error) {
    console.error("Erro no chat:", error);
    return {
      id: Date.now().toString(),
      role: 'model',
      texto: "Ocorreu um erro ao conectar com a assistente. Por favor, tente novamente em instantes.",
      timestamp: new Date()
    };
  }
};

/**
 * Busca locais de saúde próximos usando Google Maps Grounding
 */
export const buscarLocaisSaude = async (latitude: number, longitude: number, query: string = "Hospitais com atendimento endocrinologista ou urologista amigável LGBT") => {
  try {
    const response = await ai.models.generateContent({
      model: MODELO_PADRAO,
      contents: `Encontre locais de saúde: ${query}`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: latitude,
              longitude: longitude
            }
          }
        }
      },
    });

    // Processar a resposta para extrair links do mapa
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const locais = chunks
      .filter(c => c.maps)
      .map(c => ({
        nome: c.maps?.title || "Local encontrado",
        endereco: "Ver no mapa",
        url: c.maps?.uri
      }));

    return {
      texto: response.text,
      locais: locais
    };

  } catch (error) {
    console.error("Erro ao buscar mapas:", error);
    return { texto: "Não foi possível buscar locais no momento.", locais: [] };
  }
};
