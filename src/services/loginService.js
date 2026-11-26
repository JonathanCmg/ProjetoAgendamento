import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-init";
import UsuarioRepository from "../repositories/UsuarioRepository";

const usuarioRepository = new UsuarioRepository();

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

// Traduz os códigos de erro do Firebase Auth para mensagens amigáveis
export function traduzirErroAuth(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha incorretos.";
    case "auth/user-disabled":
      return "Este usuário foi desativado.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde um pouco e tente de novo.";
    case "auth/network-request-failed":
      return "Sem conexão com a internet.";
    default:
      return "Não foi possível concluir. Tente novamente.";
  }
}
