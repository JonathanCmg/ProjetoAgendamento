import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function PageEmConstrucao({ titulo }) {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{titulo}</Text>
      <Text variant="bodyMedium" style={styles.linha}>
        Em construção
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  linha: { marginTop: 8 },
});
