import PageInicio from "../pages/PageInicio";
import PageEmConstrucao from "../pages/PageEmConstrucao";
import { PERFIS } from "../models/perfis";

// Cria uma tela provisória. Quando a tela real existir, é só trocar o "component".
const emConstrucao = (titulo) =>
  function Tela() {
    return <PageEmConstrucao titulo={titulo} />;
  };

const INICIO = { name: "Inicio", title: "Início", component: PageInicio };
const FUNCIONARIOS = { name: "Funcionarios", title: "Funcionários", component: emConstrucao("Funcionários") };
const SERVICOS = { name: "Servicos", title: "Serviços", component: emConstrucao("Serviços") };
const AGENDAMENTOS = { name: "Agendamentos", title: "Agendamentos", component: emConstrucao("Agendamentos") };
const CALENDARIO = { name: "Calendario", title: "Calendário", component: emConstrucao("Calendário") };
const ACOMPANHAMENTO = { name: "Acompanhamento", title: "Acompanhamento", component: emConstrucao("Acompanhamento") };
const EMPRESA = { name: "Empresa", title: "Empresa", component: emConstrucao("Empresa") };
const MEUS_SERVICOS = { name: "MeusServicos", title: "Meus serviços", component: emConstrucao("Meus serviços") };
const HISTORICO = { name: "Historico", title: "Histórico", component: emConstrucao("Histórico") };
const NOTIFICACOES = { name: "Notificacoes", title: "Notificações", component: emConstrucao("Notificações") };

// Itens do menu lateral de cada perfil (o primeiro é a tela inicial)
export const MENU_POR_PERFIL = {
  [PERFIS.ADMINISTRADOR]: [INICIO, FUNCIONARIOS, SERVICOS, AGENDAMENTOS, CALENDARIO, ACOMPANHAMENTO, EMPRESA, NOTIFICACOES],
  [PERFIS.AGENDADOR]: [INICIO, CALENDARIO, AGENDAMENTOS, SERVICOS, ACOMPANHAMENTO, NOTIFICACOES],
  [PERFIS.EXECUTOR]: [INICIO, MEUS_SERVICOS, HISTORICO, NOTIFICACOES],
};

// Se o perfil gravado no banco for desconhecido, mostra só o Início
export const MENU_PADRAO = [INICIO];
