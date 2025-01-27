import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout } from '@/services/authService'; // Mock de login/logout
import { getSessionTokens, saveSessionTokens, removeSessionTokens } from '@/src/utils/secureStore/sessionStore/sessionStore';
import { getUser, saveUser, removeUser } from '@/src/utils/secureStore/userStore/userStore';

const authStoreQueryKey = 'auth';

type AuthSessionData = {
  token: string | null;
  user: object | null;
  isAuthenticated: boolean;
};

// Hook para buscar a sessão do cache (sem queryFn sendo executada)
const useAuthSession = () => {
  const queryClient = useQueryClient();

  // Obtém dados do cache, caso contrário, inicializa com estado deslogado
  const initialData: AuthSessionData =
    queryClient.getQueryData<AuthSessionData>([authStoreQueryKey]) || {
      token: null,
      user: null,
      isAuthenticated: false,
    };

  const sessionQuery = useQuery<AuthSessionData>({
    queryKey: [authStoreQueryKey],
    enabled: false, // Não executa nenhuma função de busca
    initialData,    // Usa o que já está no cache ou o valor padrão
  });

  return sessionQuery;
};

// Hook para login
const useAuthLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<AuthSessionData, Error, { username: string; password: string }>({
    mutationFn: async (credentials) => {
      const { token, user } = await login(credentials.username, credentials.password);

      // Salvar no Secure Store
      await saveSessionTokens(token);
      await saveUser(user);

      return { token, user, isAuthenticated: true };
    },
    onSuccess: (data) => {
      // Atualiza o cache de autenticação
      queryClient.setQueryData<AuthSessionData>([authStoreQueryKey], data);
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error);
    },
  });

  return {
    ...loginMutation,
    login: (username: string, password: string) =>
      loginMutation.mutateAsync({ username, password }),
  };
};

// Hook para logout
const useAuthLogout = () => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation<void, Error>({
    mutationFn: async () => {
      await logout(); // Mock de logout

      // Remover do Secure Store
      await removeSessionTokens();
      await removeUser();
    },
    onSuccess: () => {
      // Após logout, atualizamos o cache para refletir o estado deslogado
      queryClient.setQueryData<AuthSessionData>([authStoreQueryKey], {
        token: null,
        user: null,
        isAuthenticated: false,
      });
    },
  });

  return {
    ...logoutMutation,
    logout: () => logoutMutation.mutateAsync(),
  };
};

// Store organizado para acesso
export const useAuthStore = {
  queryKey: authStoreQueryKey,
  useSession: useAuthSession,
  useLogin: useAuthLogin,
  useLogout: useAuthLogout,
};
