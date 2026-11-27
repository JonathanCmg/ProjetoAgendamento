import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { recuperarSenha, traduzirErroAuth } from "../services/loginService";

export default function PageRecuperarSenha({ navigation }) {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Informe o e-mail da sua conta.");
      return;
    }
    setCarregando(true);
    try {
      await recuperarSenha(email);
      Alert.alert(
        "E-mail enviado",
        "Se este e-mail estiver cadastrado, você receberá um link para criar uma nova senha. Confira também o spam.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Erro", traduzirErroAuth(error));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text variant="bodyLarge" style={styles.texto}>
          Informe o e-mail da sua conta. Vamos enviar um link para você criar uma nova senha.
        </Text>
        <TextInput
          label="E-mail"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={styles.campo}
        />
        <Button mode="contained" onPress={enviar} loading={carregando} disabled={carregando}>
          Enviar link
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, justifyContent: "center", padding: 24 },
  texto: { marginBottom: 16 },
  campo: { marginBottom: 12 },
});
