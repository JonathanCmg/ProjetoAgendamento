import BaseModel from "./BaseModel";

// Documento: empresas/{empresaId}/servicos/{servicoId}
export default class Servico extends BaseModel {
  constructor(dados) {
    super(dados);
    this.nome = dados?.nome ?? "";
    this.descricao = dados?.descricao ?? "";
    this.duracaoEstimadaMin = dados?.duracaoEstimadaMin ?? 0;
    this.prazoMaximoMin = dados?.prazoMaximoMin ?? 0;
    this.informacoesAdicionais = dados?.informacoesAdicionais ?? "";
    this.tarefas = dados?.tarefas ?? []; // [{ titulo: "Conferir material" }]
  }

  toFirestore() {
    return {
      ...super.toFirestore(),
      nome: this.nome,
      descricao: this.descricao,
      duracaoEstimadaMin: this.duracaoEstimadaMin,
      prazoMaximoMin: this.prazoMaximoMin,
      informacoesAdicionais: this.informacoesAdicionais,
      tarefas: this.tarefas,
    };
  }

  fromFirestore(snapshot, options) {
    super.fromFirestore(snapshot, options);
    const dados = snapshot.data(options);
    this.nome = dados.nome ?? "";
    this.descricao = dados.descricao ?? "";
    this.duracaoEstimadaMin = dados.duracaoEstimadaMin ?? 0;
    this.prazoMaximoMin = dados.prazoMaximoMin ?? 0;
    this.informacoesAdicionais = dados.informacoesAdicionais ?? "";
    this.tarefas = dados.tarefas ?? [];
    return this;
  }
}
