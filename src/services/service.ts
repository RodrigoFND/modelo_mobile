import {
  getSessionTokens,
} from "@/src/utils/secureStore/sessionStore/sessionStore";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://dummyjson.com";
const AUTH_URL = "auth";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Propriedade opcional
}

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
      console.log("has tokens");
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      console.log("config", config.headers.Authorization);
    }

    return config;
  },
  (error) => {
    // Lida com erros antes de enviar a requisição
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
    }

    return Promise.reject(error);
  }
);



export default apiClient;