import Servico from "../models/Servico";
import BaseRepository from "./BaseRepository";

// Subcoleção: empresas/{empresaId}/servicos
export default class ServicoRepository extends BaseRepository {
  constructor(empresaId) {
    super(Servico, "empresas", empresaId, "servicos");
  }
}
