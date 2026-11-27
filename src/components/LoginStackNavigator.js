import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PageLogin from "../pages/PageLogin";
import PageCadastro from "../pages/PageCadastro";
import PageRecuperarSenha from "../pages/PageRecuperarSenha";

const Stack = createNativeStackNavigator();

// Telas para quem NÃO está logado.
export default function LoginStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={PageLogin} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={PageCadastro} options={{ title: "Cadastrar empresa" }} />
      <Stack.Screen name="RecuperarSenha" component={PageRecuperarSenha} options={{ title: "Recuperar senha" }} />
    </Stack.Navigator>
  );
}
