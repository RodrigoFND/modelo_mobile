import { AuthUserResponse, LoginResponse, RefreshTokenResponse } from "@/src/models/services/auth/auth.models";
import apiClient from "../service";

const AUTH_URL = `auth`;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


const getAuthUser = async (): Promise<AuthUserResponse> => {
  // Adiciona o atraso de 3 segundos
  await delay(3000);

  const response = await apiClient.get(`${AUTH_URL}/user/me`, {});
  return response.data;
};

const login = async (username: string, password: string): Promise<LoginResponse> => {
  // Adiciona o atraso de 3 segundos
  await delay(3000);

  const response = await apiClient.post(`${AUTH_URL}/login`, {
    username,
    password,
    expiresInMins: 1, // Incluído, conforme o exemplo da API
  });
  return response.data;
};

// ATENÇÃO!!!!! Refresh token está no SERVICE.TS, todas mudanças feitas aqui deverão ser feitas lá
const refreshToken = async ({ refreshToken }: { refreshToken: string }): Promise<RefreshTokenResponse> => {
  // Adiciona o atraso de 3 segundos
  await delay(3000);

  const response = await apiClient.post(`${AUTH_URL}/refresh`, {
    refreshToken,
    expiresInMins: 1,
  });
  return response.data;
};


 const logout = async () => {
  return Promise.resolve(); // Simula logout
};

export const AuthService = {
  getAuthUser,
  login,
  refreshToken,
  logout,
};
