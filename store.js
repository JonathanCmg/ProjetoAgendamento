import { configureStore } from "@reduxjs/toolkit";
import usuarioLogadoReducer from "./src/slices/usuarioLogadoSlice";

export const store = configureStore({
  reducer: {
    usuarioLogado: usuarioLogadoReducer,
  },
});

export default store;
