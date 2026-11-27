import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-init";
import UsuarioRepository from "../repositories/UsuarioRepository";
import EmpresaRepository from "../repositories/EmpresaRepository";

const usuarioRepository = new UsuarioRepository();
const empresaRepository = new EmpresaRepository();

export async function loginEmailSenha(email, senha) {
  await signInWithEmailAndPassword(auth, email.trim(), senha);
}

export async function recuperarSenha(email) {
  await sendPasswordResetEmail(auth, email.trim());
}

export async function sair() {
  await signOut(auth);
}

// Busca os dados do usuário (empresaId, perfil...) pelo uid
export async function buscarUsuario(uid) {
  return usuarioRepository.buscarId(uid);
}

// Busca a empresa do usuário (retorna null se não existir)
export async function buscarEmpresa(empresaId) {
  if (!empresaId) return null;
  return empresaRepository.buscarId(empresaId);
}

// Traduz os códigos de erro do Firebase Auth para mensagens amigáveis
export function traduzirErroAuth(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha incorretos.";
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";
    case "auth/user-disabled":
      return "Este usuário foi desativado.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde um pouco e tente de novo.";
    case "auth/network-request-failed":
      return "Sem conexão com a internet.";
    default:
      return `Não foi possível concluir (${error?.code ?? error?.message}).`;
  }
}
