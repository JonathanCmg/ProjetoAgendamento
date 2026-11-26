import Usuario from "../models/Usuario";
import BaseRepository from "./BaseRepository";

export default class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario, "usuarios");
  }

  async buscarPorEmpresa(empresaId) {
    return this.buscarPorCampo("empresaId", "==", empresaId);
  }
}
