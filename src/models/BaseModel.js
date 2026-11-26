// Classe base de todos os models. Cuida de id, criadoEm e atualizadoEm.
export default class BaseModel {
  constructor(dados) {
    this.id = dados?.id ?? null;
    this.criadoEm = dados?.criadoEm ?? new Date();
    this.atualizadoEm = dados?.atualizadoEm ?? new Date();
  }

  // Timestamp do Firestore -> Date
  static paraData(valor) {
    if (!valor) return null;
    return valor.toDate ? valor.toDate() : valor;
  }

  // Objeto que vai para o Firestore (o id NÃO é gravado: ele é o nome do documento)
  toFirestore() {
    return {
      criadoEm: this.criadoEm,
      atualizadoEm: this.atualizadoEm,
    };
  }

  fromFirestore(snapshot, options) {
    const dados = snapshot.data(options);
    this.id = snapshot.id;
    this.criadoEm = BaseModel.paraData(dados.criadoEm) ?? new Date();
    this.atualizadoEm = BaseModel.paraData(dados.atualizadoEm) ?? new Date();
    return this;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getCriadoEm() {
    return this.criadoEm;
  }

  getAtualizadoEm() {
    return this.atualizadoEm;
  }

  setAtualizadoEm(data) {
    this.atualizadoEm = data;
  }
}
