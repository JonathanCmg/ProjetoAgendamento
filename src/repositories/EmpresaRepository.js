import Empresa from "../models/Empresa";
import BaseRepository from "./BaseRepository";

export default class EmpresaRepository extends BaseRepository {
  constructor() {
    super(Empresa, "empresas");
  }
}
