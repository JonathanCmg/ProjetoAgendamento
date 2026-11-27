import Agendamento from "../models/Agendamento";
import BaseRepository from "./BaseRepository";

// Subcoleção: empresas/{empresaId}/agendamentos
export default class AgendamentoRepository extends BaseRepository {
  constructor(empresaId) {
    super(Agendamento, "empresas", empresaId, "agendamentos");
  }
}
