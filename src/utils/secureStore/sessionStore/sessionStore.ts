import secureStore from '../secureStore';

const SESSION_TOKEN_KEY = 'session_token';

interface SessionTokens {
  id: string;
  accessToken: string;
  refreshToken: string;
}

// Salvar o token de sessão
export async function saveSessionTokens(sessionTokens: SessionTokens): Promise<void> {
  await secureStore.saveToSecureStorage(SESSION_TOKEN_KEY, sessionTokens);
}

// Recuperar o token de sessão
export async function getSessionTokens(): Promise<SessionTokens | null> {
  const result = await secureStore.getFromSecureStorage(SESSION_TOKEN_KEY);

  // Já retorna diretamente o valor, confiando na conversão feita em `getFromSecureStorage`
  return result as SessionTokens | null;
}

// Remover o token de sessão
export async function removeSessionTokens(): Promise<void> {
  await secureStore.removeFromSecureStorage(SESSION_TOKEN_KEY);
}
