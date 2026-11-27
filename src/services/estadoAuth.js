// Sinalizador usado durante o cadastro de empresa.
// Ao criar o usuário no Authentication ele já fica "logado", mas o documento
// dele em "usuarios" ainda não existe. Com cadastrando = true, o App.js
// espera o cadastro terminar em vez de tentar carregar o usuário cedo demais.
export const estadoAuth = { cadastrando: false };
