import { createSlice } from "@reduxjs/toolkit";

// Guarda a "sessão": quem está logado (com perfil) e a empresa dele.
export const usuarioLogadoSlice = createSlice({
  name: "usuarioLogado",
  initialState: { usuarioLogado: null, empresa: null },
  reducers: {
    setUsuarioLogado: (state, action) => {
      state.usuarioLogado = action.payload;
    },
    setEmpresa: (state, action) => {
      state.empresa = action.payload;
    },
    removerUsuarioLogado: (state) => {
      state.usuarioLogado = null;
      state.empresa = null;
    },
  },
});

export const { setUsuarioLogado, setEmpresa, removerUsuarioLogado } =
  usuarioLogadoSlice.actions;
export default usuarioLogadoSlice.reducer;
