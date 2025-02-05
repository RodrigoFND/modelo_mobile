import React, { useState, memo } from "react";
import { Teste } from "@/src/models/services/teste.models";
import { Store } from "@/src/store";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  Input from "@/src/components/atom/input/Input";
import Button from "@/src/components/atom/button/Button";
import { useTypedNavigation } from "@/src/hooks/auth/useTypedNavigation";

const Item = memo(({ item }: { item: Teste }) => {
  const { navigate } = useTypedNavigation();
  const { mutate: deleteTeste, isPending } = Store.useTesteStore.useDeleteTeste();


  const handleDelete = () => {
    deleteTeste(item.$id);
  };

  return (
    <TouchableHighlight
      onPress={() =>
        navigate({
          route: "PRIVATE_COMPONENTS_PAGES_TESTEUM_ID",
          params: { id: item.$id, nome: "teste" },
        })
      }
      underlayColor="#F1F1F1"
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemId}>ID: {item.$id}</Text>
          <Text style={styles.itemNome}>{item.nome}</Text>
          <Text style={styles.itemValor}>Valor: {item.valor}</Text>
        </View>
        {/* Botão de deletar */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>{isPending ? "..." : "🗑️"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
});

export default function TesteUm() {
  const { data, isLoading, isError } = Store.useTesteStore.useGetTestes();
  const { mutate: createTeste } = Store.useTesteStore.useCreateTeste();
  const [valor, setValor] = useState(1);
  const [nome, setNome] = useState("teste");

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Ocorreu um erro ao carregar os dados.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Input.Root>
          <Input.Text placeholder="Nome" value={nome} onChangeText={setNome} />
        </Input.Root>
        <Input.Root>
          <Input.Number placeholder="Valor" value={valor} onChangeNumber={setValor} />
        </Input.Root>
        <Button.Root onPress={() => createTeste({ valor, nome })}>
          <Button.Text>Criar</Button.Text>
        </Button.Root>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
    gap: 16,
  },
  form: {
    gap: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInfo: {
    flex: 1,
  },
  itemId: {
    fontSize: 12,
    color: "#6C757D",
    marginBottom: 4,
  },
  itemNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343A40",
  },
  itemValor: {
    fontSize: 16,
    color: "#495057",
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: "#DC3545",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    fontSize: 16,
    color: "#FFF",
  },
  errorText: {
    fontSize: 16,
    color: "#DC3545",
    textAlign: "center",
    marginTop: 20,
  },
});
