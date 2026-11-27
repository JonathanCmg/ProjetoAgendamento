import { Alert } from "react-native";
import { useSelector } from "react-redux";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { sair } from "../services/loginService";
import { MENU_PADRAO, MENU_POR_PERFIL } from "./menuPorPerfil";

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

// Telas para quem ESTÁ logado: o menu muda conforme o perfil do usuário.
export default function DrawerNavigator() {
  const usuario = useSelector((state) => state.usuarioLogado.usuarioLogado);
  const itens = MENU_POR_PERFIL[usuario?.perfil] ?? MENU_PADRAO;

  return (
    <Drawer.Navigator drawerContent={(props) => <ConteudoMenu {...props} />}>
      {itens.map((item) => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{ title: item.title }}
        />
      ))}
    </Drawer.Navigator>
  );
}
