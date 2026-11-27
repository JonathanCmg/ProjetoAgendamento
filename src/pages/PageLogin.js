import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { loginEmailSenha, traduzirErroAuth } from "../services/loginService";

export default function PageLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }
    setCarregando(true);
    try {
      await loginEmailSenha(email, senha);
      // Se deu certo, o App.js percebe o login (onAuthStateChanged) e troca de tela.
    } catch (error) {
      console.log("ERRO LOGIN:", error?.code, error?.message);
      Alert.alert("Erro ao entrar", traduzirErroAuth(error));
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
        <Text variant="headlineMedium" style={styles.titulo}>
          Agendamento
        </Text>
        <Text variant="bodyMedium" style={styles.subtitulo}>
          Entre com a sua conta
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
        <TextInput
          label="Senha"
          mode="outlined"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!mostrarSenha}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={mostrarSenha ? "eye-off" : "eye"}
              onPress={() => setMostrarSenha(!mostrarSenha)}
            />
          }
          style={styles.campo}
        />

        <Button
          mode="contained"
          onPress={entrar}
          loading={carregando}
          disabled={carregando}
          style={styles.botao}
        >
          Entrar
        </Button>

        <Button mode="text" onPress={() => navigation.navigate("RecuperarSenha")} style={styles.link}>
          Esqueci minha senha
        </Button>
        <Button mode="text" onPress={() => navigation.navigate("Cadastro")}>
          Cadastrar minha empresa
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, justifyContent: "center", padding: 24 },
  titulo: { textAlign: "center", marginBottom: 4 },
  subtitulo: { textAlign: "center", marginBottom: 24 },
  campo: { marginBottom: 12 },
  botao: { marginTop: 8 },
  link: { marginTop: 8 },
});
