import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-init";
import Empresa from "../models/Empresa";
import Usuario from "../models/Usuario";
import { PERFIS } from "../models/perfis";
import EmpresaRepository from "../repositories/EmpresaRepository";
import UsuarioRepository from "../repositories/UsuarioRepository";
import { estadoAuth } from "./estadoAuth";

const empresaRepository = new EmpresaRepository();
const usuarioRepository = new UsuarioRepository();

// Cria: usuário no Authentication + empresa + documento do administrador.
// Se algo falhar no meio, desfaz o que já tinha sido criado.
export async function cadastrarEmpresaComAdmin({ empresa: dadosEmpresa, admin }) {
  estadoAuth.cadastrando = true;
  let credencial = null;
  let empresa = null;

  try {
    credencial = await createUserWithEmailAndPassword(
      auth,
      admin.email.trim(),
      admin.senha
    );

    empresa = new Empresa({
      nome: dadosEmpresa.nome.trim(),
      cnpj: dadosEmpresa.cnpj.trim(),
      telefone: dadosEmpresa.telefone.trim(),
    });
    await empresaRepository.salvar(empresa);

    const usuario = new Usuario({
      id: credencial.user.uid, // o documento usa o uid como id
      nome: admin.nome.trim(),
      email: admin.email.trim(),
      telefone: admin.telefone?.trim() ?? "",
      empresaId: empresa.getId(),
      perfil: PERFIS.ADMINISTRADOR,
      ativo: true,
    });
    await usuarioRepository.salvar(usuario);

    return usuario;
  } catch (error) {
    // Desfaz (melhor esforço) para não deixar lixo no banco
    try {
      if (empresa?.getId()) await empresaRepository.deletar(empresa.getId());
    } catch (e) {}
    try {
      if (credencial) await credencial.user.delete();
    } catch (e) {}
    throw error;
  } finally {
    estadoAuth.cadastrando = false;
  }
}
