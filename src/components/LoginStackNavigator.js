import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PageLogin from "../pages/PageLogin";

const Stack = createNativeStackNavigator();

// Telas para quem NÃO está logado.
// Depois entram aqui: Cadastro de Empresa e Recuperação de Senha.
export default function LoginStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={PageLogin} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
