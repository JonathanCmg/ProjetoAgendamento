import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-init";
import store from "./store";
import { removerUsuarioLogado, setEmpresa, setUsuarioLogado } from "./src/slices/usuarioLogadoSlice";
import { buscarEmpresa, buscarUsuario, sair } from "./src/services/loginService";
import { estadoAuth } from "./src/services/estadoAuth";
import LoginStackNavigator from "./src/components/LoginStackNavigator";
import DrawerNavigator from "./src/components/DrawerNavigator";

function Raiz() {
  const dispatch = useDispatch();
  const usuarioLogado = useSelector((state) => state.usuarioLogado.usuarioLogado);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Roda sempre que alguém loga ou desloga (e quando o app abre)
    const cancelar = onAuthStateChanged(auth, async (usuarioAuth) => {
      // Durante o cadastro de empresa, quem entra no app é a própria tela de cadastro
      if (estadoAuth.cadastrando) return;

      if (!usuarioAuth) {
        dispatch(removerUsuarioLogado());
        setCarregando(false);
        return;
      }

      try {
        const usuario = await buscarUsuario(usuarioAuth.uid);
        if (usuario && usuario.ativo) {
          const empresa = await buscarEmpresa(usuario.empresaId);
          dispatch(setEmpresa(empresa ? empresa.toPlain() : null));
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
        console.log("ERRO BUSCAR USUARIO:", error?.code, error?.message);
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
