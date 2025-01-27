import secureStore from '../secureStore';

const USER_KEY = 'user';

interface User {
  username: string;
  id: number;
}

export async function getUser(): Promise<User | null> {
  const result = await secureStore.getFromSecureStorage(USER_KEY);

  // Já retorna diretamente o valor, confiando na conversão feita em `getFromSecureStorage`
  return result as User | null;
}


// Salvar as informações do usuário
export async function saveUser(user: User): Promise<void> {
  const userString = JSON.stringify(user);
  await secureStore.saveToSecureStorage(USER_KEY, userString);
}



// Remover as informações do usuário
export async function removeUser(): Promise<void> {
  await secureStore.removeFromSecureStorage(USER_KEY);
}
