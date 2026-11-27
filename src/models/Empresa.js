import BaseModel from "./BaseModel";

// Documento: empresas/{empresaId}
export default class Empresa extends BaseModel {
  constructor(dados) {
    super(dados);
    this.nome = dados?.nome ?? "";
    this.cnpj = dados?.cnpj ?? "";
    this.telefone = dados?.telefone ?? "";
  }

  toFirestore() {
    return {
      ...super.toFirestore(),
      nome: this.nome,
      cnpj: this.cnpj,
      telefone: this.telefone,
    };
  }

  fromFirestore(snapshot, options) {
    super.fromFirestore(snapshot, options);
    const dados = snapshot.data(options);
    this.nome = dados.nome ?? "";
    this.cnpj = dados.cnpj ?? "";
    this.telefone = dados.telefone ?? "";
    return this;
  }

  // Objeto simples (serializável) para guardar no Redux
  toPlain() {
    return {
      id: this.id,
      nome: this.nome,
      cnpj: this.cnpj,
      telefone: this.telefone,
    };
  }
}
