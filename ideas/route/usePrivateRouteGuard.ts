/* 

import { useEffect, useState } from "react";
import { Route, usePathname, useRouter, useSegments } from "expo-router";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";

import { PermissionsList } from "@/src/models/services/auth/auth.models";
import { MyRoutes } from "@/src/routes/routes";

 * Hook que protege rotas definidas em um array:
 *   [ { path: "/(private)/config/appConfig", permission: ["comments:view"] }, ... ]
 *
 * @param routesToProtect Array de rotas com suas permissões exigidas
 * @param fallback Rota de fallback caso o user não tenha acesso. (default "/(public)/signIn")
 * @returns { isLoading: boolean } - indica se ainda está carregando user/permissões
 

type PrivateRouteGuardProps = {
  routesToProtect: MyRoutes[];
  fallback: Route;
}

export function usePrivateRouteGuard({routesToProtect,fallback}:PrivateRouteGuardProps) {
  const [guardLoading, setGuardLoading] = useState(true);

  const segments = useSegments();
  const router = useRouter();
  const { user, permissions, isLoading: isLoadingUser } = useAuthAppwrite();

  useEffect(() => {
    console.log("📌 ComponentLayout montado");

    return () => {
      console.log("❌ ComponentLayout desmontado");
    };
  }, []);

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }
   
    
console.log("segments", segments);
    const currentPath = `/${segments.join("/")}`;
    console.log("currentPath", currentPath);
    const sortedRoutes = [...routesToProtect].sort((a, b) => 
      b.path.split("/").length - a.path.split("/").length
    );

    // Encontrar a rota mais específica que ainda cobre o caminho atual
    const bestMatchRoute = sortedRoutes.find(route => {
      return currentPath.startsWith(route.path);
    });


    if (!bestMatchRoute) {
      console.log("no bestMatchRoute");

      router.replace(fallback);
      setGuardLoading(false);
      return;
    }
    console.log("bestMatchRoute", bestMatchRoute);


    if (!user) {
      console.log("no user");
      router.replace(bestMatchRoute.redirect || fallback);
      setGuardLoading(false);
      return;

    }


    const missingPermission = bestMatchRoute.permission.find(
      (p) => !permissions.includes(p as PermissionsList)
    );

    if (missingPermission) {
      console.log("missingPermission");
      router.replace('/(private)');
      setGuardLoading(false);
      return;
    }

    

    setGuardLoading(false);
 
  }, [user,permissions,segments, routesToProtect, fallback]);

  return {
    isLoading: guardLoading || isLoadingUser,
  };
}
 */