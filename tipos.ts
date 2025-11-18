// Definições de tipos globais

export enum CategoriaGuia {
  LEGAL = 'Legal',
  SAUDE = 'Saúde',
  SOCIAL = 'Social'
}

export interface Hospital {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  servicos: string[]; // ex: "Ambulatório", "Cirurgia", "Hormonização"
  endereco: string;
}

export interface ArtigoNoticia {
  titulo: string;
  fonte: string;
  url: string;
  resumo: string;
}

export interface MensagemChat {
  id: string;
  role: 'user' | 'model';
  texto: string;
  timestamp: Date;
  fontes?: Array<{titulo: string; url: string}>; // Para grounding
}

export interface VagaEmprego {
  id: number;
  cargo: string;
  empresa: string;
  local: string;
  tipo: string; // Remoto, Híbrido, Presencial
  link?: string;
}