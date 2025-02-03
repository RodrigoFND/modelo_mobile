// src/hooks/usePrivateRouteGuard.ts

import { useEffect, useState } from "react";
import { Route, usePathname, useRouter, useSegments } from "expo-router";
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
    if (isLoadingUser) {
      return;
    }

    const currentPath = `/${segments.join("/")}`;
    const matchingRoute = routesToProtect.find((route) =>
      currentPath.startsWith(route.path)
    );
    if (!matchingRoute) {
      router.replace(fallback);
      setGuardLoading(false);
      return;
    }
    console.log("segments", segments);

    if (!user) {
      router.replace(matchingRoute.redirect || fallback);
      setGuardLoading(false);
      return;
    }

    const missingPermission = matchingRoute.permission.find(
      (p) => !permissions.includes(p as PermissionsList)
    );

    if (missingPermission) {
      router.replace(matchingRoute.redirect || fallback);
      setGuardLoading(false);
      return;
    }

    setGuardLoading(false);
  }, [segments, user, permissions, routesToProtect, router]);

  return {
    isLoading: guardLoading || isLoadingUser,
  };
}
