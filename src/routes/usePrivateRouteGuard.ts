// src/hooks/usePrivateRouteGuard.ts

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";

import { PermissionsList } from "@/src/models/services/auth/auth.models";
import { MyRoutes } from "@/src/routes/routes";
/**
 * Hook que protege rotas definidas em um array:
 *   [ { path: "/(private)/config/appConfig", permission: ["comments:view"] }, ... ]
 *
 * @param routesToProtect Array de rotas com suas permissões exigidas
 * @param fallback Rota de fallback caso o user não tenha acesso. (default "/(public)/signIn")
 * @returns { isLoading: boolean } - indica se ainda está carregando user/permissões
 */
export function usePrivateRouteGuard(
  routesToProtect: MyRoutes[],
  fallback: string = "/(public)/signIn"

) {
  const [guardLoading, setGuardLoading] = useState(true);

  const pathname = usePathname();        // ex. "/(private)/config/appConfig"
  const router = useRouter();
  const { user, permissions } = useAuthAppwrite();

  useEffect(() => {

    const matchingRoute = routesToProtect.find(route => route.path.includes(pathname));
    if (!matchingRoute) {
        router.replace('../');
      setGuardLoading(false);
      return;
    }


    // 2. Se a rota está protegida mas não existe 'user', redireciona
    if (!user) {
      console.log("user", "nao existe");
      router.replace(matchingRoute.redirect || '../');
      setGuardLoading(false);
      return;
    }


    // 3. Verifica se o user possui TODAS as permissões necessárias
    const missingPermission = matchingRoute.permission.find(
      (p) => !permissions.includes(p as PermissionsList)
    );


    if (missingPermission) {
      console.log("missingPermission", missingPermission);
      // Falta permissão => redireciona
      router.replace(matchingRoute.redirect || '/');
      setGuardLoading(false);
      return;


    }

    // 4. Se passou em todas as checagens, libera
    setGuardLoading(false);
  }, [pathname, user, permissions, routesToProtect, router, fallback]);

  // Retornamos 'isLoading' (true enquanto estiver checando ou user estiver carregando)
  return {
    isLoading: guardLoading,
  };
}
