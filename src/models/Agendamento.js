import BaseModel from "./BaseModel";

export const STATUS_AGENDAMENTO = {
  AGENDADO: "agendado",
  EM_ANDAMENTO: "em_andamento",
  CONCLUIDO: "concluido",
  CANCELADO: "cancelado",
};

// Documento: empresas/{empresaId}/agendamentos/{agendamentoId}
// "Atrasado" NÃO é um status gravado: é calculado (não concluído e prazo vencido).
export default class Agendamento extends BaseModel {
  constructor(dados) {
    super(dados);
    this.servicoId = dados?.servicoId ?? null;
    this.executorId = dados?.executorId ?? null;
    this.criadoPorId = dados?.criadoPorId ?? null;
    this.inicioPrevisto = dados?.inicioPrevisto ?? null; // Date
    this.fimPrevisto = dados?.fimPrevisto ?? null; // Date (início + duração do serviço)
    this.cliente = {
      nome: dados?.cliente?.nome ?? "",
      telefone: dados?.cliente?.telefone ?? "",
    };
    this.endereco = {
      cep: dados?.endereco?.cep ?? "",
      logradouro: dados?.endereco?.logradouro ?? "",
      numero: dados?.endereco?.numero ?? "",
      cidade: dados?.endereco?.cidade ?? "",
      lat: dados?.endereco?.lat ?? null,
      lng: dados?.endereco?.lng ?? null,
    };
    this.observacoes = dados?.observacoes ?? "";
    this.status = dados?.status ?? STATUS_AGENDAMENTO.AGENDADO;
    this.execucao = dados?.execucao ?? null; // só existe depois de iniciar o serviço
  }

  static normalizarExecucao(e) {
    if (!e) return null;
    return {
      inicioReal: BaseModel.paraData(e.inicioReal),
      fimReal: BaseModel.paraData(e.fimReal),
      tempoRealMin: e.tempoRealMin ?? null,
      observacoes: e.observacoes ?? "",
      justificativaAtraso: e.justificativaAtraso ?? "",
      fotos: e.fotos ?? [],
    };
  }

  toFirestore() {
    return {
      ...super.toFirestore(),
      servicoId: this.servicoId,
      executorId: this.executorId,
      criadoPorId: this.criadoPorId,
      inicioPrevisto: this.inicioPrevisto,
      fimPrevisto: this.fimPrevisto,
      cliente: this.cliente,
      endereco: this.endereco,
      observacoes: this.observacoes,
      status: this.status,
      execucao: this.execucao,
    };
  }

  fromFirestore(snapshot, options) {
    super.fromFirestore(snapshot, options);
    const dados = snapshot.data(options);
    this.servicoId = dados.servicoId ?? null;
    this.executorId = dados.executorId ?? null;
    this.criadoPorId = dados.criadoPorId ?? null;
    this.inicioPrevisto = BaseModel.paraData(dados.inicioPrevisto);
    this.fimPrevisto = BaseModel.paraData(dados.fimPrevisto);
    this.cliente = {
      nome: dados.cliente?.nome ?? "",
      telefone: dados.cliente?.telefone ?? "",
    };
    this.endereco = {
      cep: dados.endereco?.cep ?? "",
      logradouro: dados.endereco?.logradouro ?? "",
      numero: dados.endereco?.numero ?? "",
      cidade: dados.endereco?.cidade ?? "",
      lat: dados.endereco?.lat ?? null,
      lng: dados.endereco?.lng ?? null,
    };
    this.observacoes = dados.observacoes ?? "";
    this.status = dados.status ?? STATUS_AGENDAMENTO.AGENDADO;
    this.execucao = Agendamento.normalizarExecucao(dados.execucao);
    return this;
  }
}
