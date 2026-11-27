import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { ROTULOS_PERFIL } from "../models/perfis";

export default function PageInicio() {
  const usuario = useSelector((state) => state.usuarioLogado.usuarioLogado);
  const empresa = useSelector((state) => state.usuarioLogado.empresa);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Olá, {usuario?.nome}!</Text>
      <Text variant="bodyMedium" style={styles.linha}>
        {usuario?.email}
      </Text>
      <Text variant="bodyLarge" style={styles.linha}>
        Perfil: {ROTULOS_PERFIL[usuario?.perfil] ?? usuario?.perfil}
      </Text>
      <Text variant="bodyLarge" style={styles.linha}>
        Empresa: {empresa?.nome ?? "(empresa não encontrada)"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  linha: { marginTop: 8 },
});
