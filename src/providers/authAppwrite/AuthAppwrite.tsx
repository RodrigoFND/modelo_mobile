import {
  PermissionsList,
  Roles,
  User,
} from "@/src/models/services/auth.models";
import { AuthService } from "@/src/services/appwrite/auth/auth.service";
import ApiClient from "@/src/services/appwrite/service";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { debounce } from "lodash";

type AuthAppwriteContextType = {
  user: User | null;
  roles: Roles[];
  permissions: PermissionsList[];
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutAllSessions: () => Promise<void>;

  updateSession: () => Promise<void>;
  isLoading: boolean;
};

const AuthAppwriteContext = createContext<AuthAppwriteContextType | null>(null);

export const AuthProviderAppwrite: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Roles[]>([]);
  const [permissions, setPermissions] = useState<PermissionsList[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const tryAutenticateCurrentSession = async () => {
      try {
        const userLogged = await getCurrentSession();
        if (userLogged) autenticateUser(userLogged);
      } catch (error) {}
    };

    const initialize = async () => {
      await tryAutenticateCurrentSession().catch(() => {});
      setIsLoading(false);
    };

    initialize();
  }, []);

  useEffect(() => {
    ApiClient.experiedSessionEvent.on("sessionExpired", logout);
    return () => {
      ApiClient.experiedSessionEvent.off("sessionExpired", logout);
    };
  }, [logout]);

  const autenticateUser = (user: User) => {
    setUser(user);
    setRoles(user.teams.map((team) => team.name as Roles));
    setPermissions(user.teams.flatMap((team) => team.permissions));
    setIsAuthenticated(true);
  };

  const unAuthenticateUser = () => {
    setUser(null);
    setRoles([]);
    setPermissions([]);
    setIsAuthenticated(false);
  };

  function checkHasSessionActive() {
    return isAuthenticated && !!user;
  }

  async function getCurrentSession(): Promise<User | null> {
    try {
      return await AuthService.getCurrentSession();
    } catch (error) {
      console.warn("Falha ao obter sessão do usuário:", error);
      return null;
    }
  }

  // 📌 Funções de autenticação (Mantemos elas agrupadas)
  async function login(emailOrUsername: string, password: string) {
    if (checkHasSessionActive()) return;

    try {
      const user = await AuthService.login(emailOrUsername, password);
      autenticateUser(user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha ao autenticar usuário.");
    }
  }

  async function logout() {
    if (!checkHasSessionActive()) return;
    try {
      setIsLoading(true);
      await AuthService.logout();
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      unAuthenticateUser();
      setIsLoading(false);
    }
  }

  async function logoutAllSessions() {
    try {
      await AuthService.logoutAllSessions();
    } catch (error) {
      console.error("Erro ao deslogar todas as sessões:", error);
    } finally {
      unAuthenticateUser();
    }
  }

  async function updateSession() {
    if (!checkHasSessionActive()) return;
    const session = await getCurrentSession();
    if (session) autenticateUser(session);
  }

  return (
    <AuthAppwriteContext.Provider
      value={{
        user,
        roles,
        permissions,
        isAuthenticated,
        login,
        logout,
        logoutAllSessions,
        updateSession,
        isLoading,
      }}
    >
      {children}
    </AuthAppwriteContext.Provider>
  );
};

export const useAuthAppwrite = () => {
  const context = useContext(AuthAppwriteContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
