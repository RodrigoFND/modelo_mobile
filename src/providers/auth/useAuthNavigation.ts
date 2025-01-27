import { useEffect, useState } from "react";
import { useNavigationContainerRef, router,usePathname } from "expo-router";

type AuthNavigationProps = {
  isAuthInitialized: boolean;
  isAuthenticated: boolean;
};

export const useAuthNavigation = ({ isAuthInitialized, isAuthenticated }: AuthNavigationProps) => {
  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigation = useNavigationContainerRef();
  const pathname = usePathname(); // Obtém o caminho atual da rota

  // Gerenciar prontidão da navegação
  useEffect(() => {
    const handleNavigationReady = () => {
      setNavigationReady(true);
    };

    if (rootNavigation.isReady()) {
      handleNavigationReady();
    } else {
      const unsubscribe = rootNavigation.addListener("state", handleNavigationReady);
      return () => {
        unsubscribe();
      };
    }
  }, [rootNavigation]);

  // Gerenciar redirecionamento baseado em autenticação
  useEffect(() => {
    if (!isNavigationReady || !isAuthInitialized) return;
    
    const currentRoute = pathname; // Obtém a rota atual
  
    if (isAuthenticated) {
      if (currentRoute !== "/lista-users") {
        router.replace("/lista-users");
      }
    } else {
      if (currentRoute !== "/login") {
        router.replace("/login");
      }
    }
  }, [isNavigationReady, isAuthInitialized, isAuthenticated]);

  return { isNavigationReady, rootNavigation };
};
