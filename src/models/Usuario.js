import BaseModel from "./BaseModel";

// Documento: usuarios/{uid}  (o id do documento é o uid do Authentication)
// A senha NUNCA é guardada aqui, só no Authentication.
export default class Usuario extends BaseModel {
  constructor(dados) {
    super(dados);
    this.nome = dados?.nome ?? "";
    this.email = dados?.email ?? "";
    this.telefone = dados?.telefone ?? "";
    this.empresaId = dados?.empresaId ?? null;
    this.perfil = dados?.perfil ?? null;
    this.ativo = dados?.ativo ?? true;
    this.servicosIds = dados?.servicosIds ?? [];
  }

  toFirestore() {
    return {
      ...super.toFirestore(),
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      empresaId: this.empresaId,
      perfil: this.perfil,
      ativo: this.ativo,
      servicosIds: this.servicosIds,
    };
  }

  fromFirestore(snapshot, options) {
    super.fromFirestore(snapshot, options);
    const dados = snapshot.data(options);
    this.nome = dados.nome ?? "";
    this.email = dados.email ?? "";
    this.telefone = dados.telefone ?? "";
    this.empresaId = dados.empresaId ?? null;
    this.perfil = dados.perfil ?? null;
    this.ativo = dados.ativo ?? true;
    this.servicosIds = dados.servicosIds ?? [];
    return this;
  }

  // Objeto simples (serializável) para guardar no Redux
  toPlain() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      empresaId: this.empresaId,
      perfil: this.perfil,
      ativo: this.ativo,
      servicosIds: this.servicosIds,
    };
  }
}
