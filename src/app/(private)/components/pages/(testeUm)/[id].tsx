import React, { useEffect, useState } from "react";
import { Store } from "@/src/store";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/src/components/atom/button/Button";
import { useTypedNavigation } from "@/src/hooks/auth/useTypedNavigation";

export default function TesteUmId() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = Store.useTesteStore.useGetByIdTeste(
    id as string
  );
  const { mutate: updateTeste, isPending: isUpdating } =
    Store.useTesteStore.useUpdateTeste();
  const { mutate: deleteTeste, isPending: isDeleting } =
    Store.useTesteStore.useDeleteTeste();

  // Estados para edição
  const [nome, setNome] = useState(data?.nome || "");
  const [valor, setValor] = useState(data?.valor.toString() || "");
  const { navigate } = useTypedNavigation();  

  useEffect(() => {
    if (data) {
      setNome(data.nome);
      setValor(data.valor.toString());
    }
  }, [data]);

  // Função para salvar alterações

  const handleSave = () => {
    if (!id) return;
    updateTeste({ documentId: id as string, nome, valor: Number(valor) });
    navigate({ route: "PRIVATE_COMPONENTS_PAGES_TESTEUM_LIST", replace: true });
  };


  const handleDelete = () => {
    if (!id) return;
    deleteTeste(id as string);
    navigate({ route: "PRIVATE_COMPONENTS_PAGES_TESTEUM_LIST", replace: true });
  };


  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar os dados.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Detalhes do TesteUm</Text>
        <Text style={styles.itemId}>ID: {data.$id}</Text>

        {/* Campo Nome */}
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome"
        />

        {/* Campo Valor */}
        <Text style={styles.label}>Valor:</Text>
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
          placeholder="Digite o valor"
        />

        {/* Botão de Salvar */}
        <View style={styles.buttonContainer}>
          <Button.Root
            action="primary"
            onPress={handleSave}
            disabled={isUpdating}
          >
            <Button.Text>{isUpdating ? "Salvando..." : "Salvar"}</Button.Text>
          </Button.Root>

          <Button.Root
            action="danger"
            onPress={handleDelete}
            disabled={isDeleting}
          >
            <Button.Text>{isDeleting ? "Deletando..." : "Deletar"}</Button.Text>
          </Button.Root>
        </View>
      </View>
    </SafeAreaView>
  );
}

// 🎨 Estilos bonitos e modernos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 12,
  },
  itemId: {
    fontSize: 14,
    color: "#6C757D",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#495057",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "#F1F3F5",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: "#DC3545",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 10,
  },
});
