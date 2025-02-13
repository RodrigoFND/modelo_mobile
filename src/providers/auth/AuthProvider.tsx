import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { AuthService } from "@/src/services/axios/service";
import {
  getSessionTokens,
  saveSessionTokens,
  removeSessionTokens,
} from "@/src/utils/secureStore/sessionStore/sessionStore";
import {
  saveUser,
  removeUser,
} from "@/src/utils/secureStore/userStore/userStore";
import { AUTH_EVENTS } from "@/src/utils/emitters/authEvents";
import authEventEmitter from "@/src/utils/emitters/authEvents";
import { useAuthNavigation } from "./useAuthNavigation";
import uuid from "react-native-uuid";
import { useAuthDataManager } from "./useAuthDataManager";

type AuthSessionData = {
  user: { username: string; id: number } | null;
  isAuthInitialized: boolean;
  isAuthenticated: boolean;
  isRevalidatingToken: boolean;
  session: { id: string; accessToken: string; refreshToken: string } | null;
};

type AuthContextProps = {
  user: { username: string; id: number } | null;
  isAuthenticated: boolean;
  isRevalidatingToken: boolean;
  isAuthInitialized: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session: { id: string; accessToken: string; refreshToken: string } | null;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthInitialized: false,
  isAuthenticated: false,
  isRevalidatingToken: false,
  signIn: async () => {},
  signOut: async () => {},
  session: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthSessionData>({
    user: null,
    isAuthInitialized: false,
    isAuthenticated: false,
    isRevalidatingToken: false,
    session: null,
  });
  // Usar o hook de navegação
  useAuthNavigation({
    isAuthInitialized: state.isAuthInitialized,
    isAuthenticated: state.isAuthenticated,
  });
  useAuthDataManager({
    isAuthenticated: state.isAuthenticated,
  });

  useEffect(() => {
    authEventEmitter.on(AUTH_EVENTS.SESSION_RENEWED, handleSessionRenewed);
    authEventEmitter.on(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);
    return () => {
      authEventEmitter.off(AUTH_EVENTS.SESSION_RENEWED, handleSessionRenewed);
      authEventEmitter.off(AUTH_EVENTS.SESSION_EXPIRED, handleSessionExpired);
    };
  }, []);

  useEffect(() => {
    if (!state.isAuthInitialized) {
      initializeAuth();
    }
  }, [state.isAuthInitialized]);

  async function initializeAuth() {
    try {
      const session = await getSessionTokens();
      if (session) {
        await signInWithToken();
      }
    } catch (error) {
    } finally {
      setState((prevState) => ({
        ...prevState,
        isAuthInitialized: true,
      }));
    }
  }

  function checkCanSignIn(): boolean {
    return state.session == null;
  }
  

  async function signIn(username: string, password: string): Promise<void> {
    try {
      if (!checkCanSignIn()) throw new Error("Has a Session in progress");
      const { accessToken, refreshToken, id } = await AuthService.login(
        username,
        password
      );
      const session = { id: uuid.v4(), accessToken, refreshToken };
      await saveSessionTokens(session);
      await saveUser({ username, id });

      setState({
        ...state,
        user: { username, id: 1 },
        isAuthenticated: true,
        session,
      });
    } catch (error) {
      /*    console.error("signIn", error); */
    }
  }

  async function signInWithToken(): Promise<void> {
    try {
      const username = "teste";
      const userId = 3232;

      const tokens = await getSessionTokens();

      if (!tokens) throw new Error("No tokens found");
      const session = {
        id: uuid.v4(),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };

      await saveSessionTokens(session);
      await saveUser({ username, id: userId });

      setState({
        ...state,
        user: { username, id: userId },
        isAuthenticated: true,
        session,
      });
    } catch (error) {
      console.error("signInWithToken", error);
    }
  }

  async function signOut(): Promise<void> {
    await AuthService.logout();
    await removeSessionTokens();
    await removeUser();
    setState({
      ...state,
      user: null,
      isAuthenticated: false,
      session: null,
    });
  }

  async function handleSessionRenewed(): Promise<void> {
    const session = await getSessionTokens();

    if (!session) {
      /*       console.warn("handleSessionRenewed","Sem dados na sessão"); */
      signOut();
      return;
    }
    /*     console.log("Sessao atualizada com sucesso"); */
    setState({
      ...state,
      session: session,
    });
  }

  function handleSessionExpired(): void {
    /*    console.warn("handleSessionExpired","Sessão expirada. Deslogando usuário..."); */
    signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAuthInitialized: state.isAuthInitialized,
        isRevalidatingToken: state.isRevalidatingToken,
        signIn,
        signOut,
        session: state.session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
