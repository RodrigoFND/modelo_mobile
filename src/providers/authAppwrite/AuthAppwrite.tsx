import {
  PermissionsList,
  Roles,
  User,
} from "@/src/models/services/auth/auth.models";
import { AuthAPI } from "@/src/services/appwrite/auth/auth.service";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type AuthAppwriteContextType = {
  user: User | null;
  roles: Roles[];
  permissions: PermissionsList[];
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

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
    const prepareAuth = async () => {
      try {
        const userLogged = await getCurrentSession();
        if (userLogged) {
          fillUserData(userLogged);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Erro ao obter sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };

    prepareAuth();
  }, []);

  const fillUserData = (user: User) => {
    setUser(user);
    setRoles(user.teams.map((team) => team.name as Roles));
    setPermissions(user.teams.flatMap((team) => team.permissions));
  };

  const removeUserData = () => {
    setUser(null);
    setRoles([]);
    setPermissions([]);
  };

  const getCurrentSession = useCallback(async (): Promise<User | null> => {
    try {
      return await AuthAPI.getCurrentSession();
    } catch (error) {
      console.warn("Falha ao obter sessão do usuário:", error);
      return null;
    }
  }, []);

  const login = useCallback(
    async (emailOrUsername: string, password: string) => {
      try {
        const user = await AuthAPI.login(emailOrUsername, password);
        fillUserData(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw new Error("Falha ao autenticar usuário.");
      }
    },
    []
  );

  const updateSession = useCallback(async () => {
    if (!isAuthenticated && !user) return;
    const session = await getCurrentSession();
    if (session) {
      fillUserData(session);
    }
  }, [isAuthenticated, user]);

  const logout = useCallback(async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      setIsAuthenticated(false);
      removeUserData();
    }
  }, []);

  return (
    <AuthAppwriteContext.Provider
      value={{
        user,
        roles,
        permissions,
        isAuthenticated,
        login,
        logout,
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
