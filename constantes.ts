import { Hospital, VagaEmprego } from './tipos';

export const HOSPITAIS_REFERENCIA: Hospital[] = [
  {
    id: 1,
    nome: "Hospital das Clínicas da FMUSP (AMTIGOS)",
    cidade: "São Paulo",
    estado: "SP",
    servicos: ["Hormonização", "Cirurgia", "Acompanhamento Psicológico"],
    endereco: "Av. Dr. Enéas Carvalho de Aguiar, 255 - Cerqueira César"
  },
  {
    id: 2,
    nome: "CRT - DST/Aids de São Paulo",
    cidade: "São Paulo",
    estado: "SP",
    servicos: ["Hormonização", "Acolhimento"],
    endereco: "Rua Santa Cruz, 81 - Vila Mariana"
  },
  {
    id: 3,
    nome: "Hospital Universitário Pedro Ernesto (HUPE)",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    servicos: ["Cirurgia", "Hormonização", "Voz"],
    endereco: "Boulevard 28 de Setembro, 77 - Vila Isabel"
  },
  {
    id: 4,
    nome: "Hospital de Clínicas de Porto Alegre (PROTIG)",
    cidade: "Porto Alegre",
    estado: "RS",
    servicos: ["Cirurgia de Redesignação", "Hormonização"],
    endereco: "R. Ramiro Barcelos, 2350 - Santa Cecília"
  },
  {
    id: 5,
    nome: "Hospital das Clínicas da UFPE",
    cidade: "Recife",
    estado: "PE",
    servicos: ["Cirurgia", "Hormonização"],
    endereco: "Av. Prof. Moraes Rego, 1235 - Cidade Universitária"
  },
  {
    id: 6,
    nome: "Hospital Universitário de Brasília (HUB)",
    cidade: "Brasília",
    estado: "DF",
    servicos: ["Ambulatório Trans"],
    endereco: "SGAN 605 - Asa Norte"
  }
];

export const LISTA_DOCUMENTOS_RETIFICACAO = [
  "Certidão de Nascimento atualizada",
  "Certidão de Casamento atualizada (se houver)",
  "Cópia do RG e CPF",
  "Título de Eleitor e comprovante de votação/quitação",
  "Certidão do Distribuidor Cível (Estadual e Federal)",
  "Certidão do Distribuidor Criminal (Estadual e Federal)",
  "Certidão de Execução Criminal",
  "Certidão dos Tabelionatos de Protesto",
  "Certidão da Justiça do Trabalho",
  "Certidão da Justiça Militar (se aplicável)"
];

// Dados mockados para oportunidades iniciais (serão complementados pela IA)
export const VAGAS_DESTAQUE: VagaEmprego[] = [
  { id: 1, cargo: "Desenvolvedor Frontend (Afirmativa Trans)", empresa: "TechInclude", local: "Remoto", tipo: "CLT" },
  { id: 2, cargo: "Analista de RH", empresa: "Diversidade Corp", local: "São Paulo, SP", tipo: "Híbrido" },
  { id: 3, cargo: "Atendimento ao Cliente", empresa: "Banco Acolhedor", local: "Todo Brasil", tipo: "Remoto" }
];