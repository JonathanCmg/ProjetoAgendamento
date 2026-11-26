import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-init";
import store from "./store";
import { removerUsuarioLogado, setUsuarioLogado } from "./src/slices/usuarioLogadoSlice";
import { buscarUsuario, sair } from "./src/services/loginService";
import LoginStackNavigator from "./src/components/LoginStackNavigator";
import DrawerNavigator from "./src/components/DrawerNavigator";

function Raiz() {
  const dispatch = useDispatch();
  const usuarioLogado = useSelector((state) => state.usuarioLogado.usuarioLogado);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Roda sempre que alguém loga ou desloga (e quando o app abre)
    const cancelar = onAuthStateChanged(auth, async (usuarioAuth) => {
      if (!usuarioAuth) {
        dispatch(removerUsuarioLogado());
        setCarregando(false);
        return;
      }

      try {
        const usuario = await buscarUsuario(usuarioAuth.uid);
        if (usuario && usuario.ativo) {
          dispatch(setUsuarioLogado(usuario.toPlain()));
        } else {
          Alert.alert(
            "Acesso negado",
            usuario
              ? "Este usuário está desativado."
              : "Dados do usuário não encontrados no banco."
          );
          await sair();
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar seus dados. Tente novamente.");
        await sair();
      }
      setCarregando(false);
    });

    return cancelar;
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return usuarioLogado ? <DrawerNavigator /> : <LoginStackNavigator />;
}

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Raiz />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
