import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setEmpresa, setUsuarioLogado } from "../slices/usuarioLogadoSlice";
import { cadastrarEmpresaComAdmin } from "../services/cadastroService";
import { traduzirErroAuth } from "../services/loginService";

export default function PageCadastro() {
  const dispatch = useDispatch();

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefoneEmpresa, setTelefoneEmpresa] = useState("");

  const [nomeAdmin, setNomeAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [carregando, setCarregando] = useState(false);

  function validar() {
    if (!nomeEmpresa.trim()) return "Informe o nome da empresa.";
    if (!nomeAdmin.trim()) return "Informe o seu nome.";
    if (!email.trim()) return "Informe o seu e-mail.";
    if (senha.length < 6) return "A senha precisa ter pelo menos 6 caracteres.";
    if (senha !== confirmarSenha) return "As senhas não são iguais.";
    return null;
  }

  async function cadastrar() {
    const erro = validar();
    if (erro) {
      Alert.alert("Atenção", erro);
      return;
    }

    setCarregando(true);
    try {
      const usuario = await cadastrarEmpresaComAdmin({
        empresa: { nome: nomeEmpresa, cnpj, telefone: telefoneEmpresa },
        admin: { nome: nomeAdmin, email, senha },
      });
      // Já entra no app como administrador da empresa nova
      dispatch(
        setEmpresa({
          id: usuario.empresaId,
          nome: nomeEmpresa.trim(),
          cnpj: cnpj.trim(),
          telefone: telefoneEmpresa.trim(),
        })
      );
      dispatch(setUsuarioLogado(usuario.toPlain()));
    } catch (error) {
      console.log("ERRO CADASTRO:", error?.code, error?.message);
      Alert.alert("Erro ao cadastrar", traduzirErroAuth(error));
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text variant="titleMedium" style={styles.secao}>
          Dados da empresa
        </Text>
        <TextInput label="Nome da empresa *" mode="outlined" value={nomeEmpresa} onChangeText={setNomeEmpresa} style={styles.campo} />
        <TextInput label="CNPJ" mode="outlined" value={cnpj} onChangeText={setCnpj} keyboardType="numeric" style={styles.campo} />
        <TextInput label="Telefone" mode="outlined" value={telefoneEmpresa} onChangeText={setTelefoneEmpresa} keyboardType="phone-pad" style={styles.campo} />

        <Divider style={styles.divisor} />

        <Text variant="titleMedium" style={styles.secao}>
          Administrador
        </Text>
        <TextInput label="Seu nome *" mode="outlined" value={nomeAdmin} onChangeText={setNomeAdmin} style={styles.campo} />
        <TextInput
          label="E-mail *"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={styles.campo}
        />
        <TextInput label="Senha *" mode="outlined" value={senha} onChangeText={setSenha} secureTextEntry autoCapitalize="none" style={styles.campo} />
        <TextInput label="Confirmar senha *" mode="outlined" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry autoCapitalize="none" style={styles.campo} />

        <Button mode="contained" onPress={cadastrar} loading={carregando} disabled={carregando} style={styles.botao}>
          Cadastrar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 24, paddingBottom: 48 },
  secao: { marginBottom: 12 },
  campo: { marginBottom: 12 },
  divisor: { marginVertical: 16 },
  botao: { marginTop: 8 },
});
