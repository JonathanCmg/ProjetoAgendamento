import { Alert } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import PageInicio from "../pages/PageInicio";
import { sair } from "../services/loginService";

const Drawer = createDrawerNavigator();

function ConteudoMenu(props) {
  async function deslogar() {
    try {
      await sair();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={deslogar} />
    </DrawerContentScrollView>
  );
}

// Telas para quem ESTÁ logado.
// Depois os itens do menu passam a variar conforme o perfil do usuário.
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <ConteudoMenu {...props} />}>
      <Drawer.Screen name="Inicio" component={PageInicio} options={{ title: "Início" }} />
    </Drawer.Navigator>
  );
}
