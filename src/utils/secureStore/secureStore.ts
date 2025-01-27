import * as SecureStore from 'expo-secure-store';

// Função genérica para lidar com erros no SecureStore
async function trySecureStoreOperation(operation: () => Promise<void>): Promise<void> {
  try {
    await operation();
  } catch (error) {
    console.error(`Erro no Secure Store: ${error}`);
  }
}

// Armazena um item com uma chave definida
async function saveToSecureStorage(key: string, value: string | object): Promise<void> {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  await trySecureStoreOperation(() => SecureStore.setItemAsync(key, stringValue));
}


// Recupera um item com uma chave definida
async function getFromSecureStorage(key: string): Promise<string | object | null> {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      try {
        return JSON.parse(result); // Tenta converter para objeto
      } catch {
        return result; // Retorna como string se não for um JSON válido
      }
    }
    return null;
  } catch (error) {
    console.error(`Erro ao recuperar do Secure Store: ${error}`);
    return null;
  }
}


// Remove um item com uma chave definida
async function removeFromSecureStorage(key: string): Promise<void> {
  await trySecureStoreOperation(() => SecureStore.deleteItemAsync(key));
}

export default {
  saveToSecureStorage,
  getFromSecureStorage,
  removeFromSecureStorage,
};


