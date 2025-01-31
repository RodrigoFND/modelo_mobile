import {
  LoginResponse,
  RefreshTokenResponse,
} from "@/src/models/services/auth/auth.models";
import authEventEmitter from "@/src/utils/emitters/authEvents";
import { AUTH_EVENTS } from "@/src/utils/emitters/authEvents";
import {
  getSessionTokens,
  saveSessionTokens,
} from "@/src/utils/secureStore/sessionStore/sessionStore";
import {
  TokenNotFoundError,
  SessionIdChangedError,
} from "@/src/errorsException";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://dummyjson.com";
const AUTH_URL = "auth";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Propriedade opcional
}

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

// Cria uma instância do Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Inclui cookies na requisição
});

// Interceptor de Requisição: Adiciona cabeçalhos de autenticação
apiClient.interceptors.request.use(
  async (config) => {
    const tokens = await getSessionTokens();
    if (tokens) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    // Lida com erros antes de enviar a requisição
    return Promise.reject(error);
  }
);

const processRequestQueue = (accessToken: string, error?: any) => {
  if (error) {
    refreshAndRetryQueue.forEach((item) => item.reject(error));
  } else {
    refreshAndRetryQueue.forEach((item) => {
      item.config.headers = item.config.headers || {};
      item.config.headers.Authorization = `Bearer ${accessToken}`;
      item.resolve(apiClient(item.config));
    });
  }
  refreshAndRetryQueue.length = 0; // Limpa a fila
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Adiciona a requisição à fila
        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      isRefreshing = true;

      try {
        const previousTokens = await getSessionTokens();
        if (!previousTokens?.refreshToken) throw new TokenNotFoundError();

        // Obtém os tokens atualizados
        const refreshResponse = await refreshToken({
          refreshToken: previousTokens.refreshToken,
        }).catch(async (err) => {
          const currentTokens = await getSessionTokens();
          if (currentTokens?.id !== previousTokens.id) {
            throw new SessionIdChangedError(); // Se o ID da sessão mudou, lança um erro
          } else {
            throw err; // Se o ID da sessão não mudou, lança o erro original
          }
        });

        // Atualiza os tokens de sessão
        const currentTokens = await getSessionTokens();
        if (!currentTokens || currentTokens?.id !== previousTokens.id) {
          throw new SessionIdChangedError();
        }
        await saveSessionTokens({
          id: currentTokens.id,
          accessToken: refreshResponse.accessToken,
          refreshToken: refreshResponse.refreshToken,
        });

        authEventEmitter.emit(AUTH_EVENTS.SESSION_RENEWED);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;
        processRequestQueue(refreshResponse.accessToken); // Processa a fila de requisições
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Rejeita as requisições da fila em caso de erro
        processRequestQueue("", refreshError);

        if (refreshError instanceof SessionIdChangedError) {
          console.warn("Erro de ID de sessão alterado:");
        } else {
          authEventEmitter.emit(AUTH_EVENTS.SESSION_EXPIRED);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // Libera o flag de renovação
      }
    }

    return Promise.reject(error);
  }
);

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiClient.post(`${AUTH_URL}/login`, {
    username,
    password,
    expiresInMins: 1, // Incluído, conforme o exemplo da API
  });
  return response.data;
};

const refreshToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post(`${AUTH_URL}/refresh`, {
    refreshToken,
    expiresInMins: 1,
  });
  return response.data;
};

const logout = async () => {
  return Promise.resolve(); // Simula logout
};

export default apiClient;
export const AuthService = { login, refreshToken, logout };
