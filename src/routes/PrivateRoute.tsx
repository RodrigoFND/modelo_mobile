// ProtectedRoute.tsx
import React, { FC, ReactNode, useEffect, useMemo } from "react";
import { useRouter, usePathname, Route } from "expo-router";

import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import { PermissionsList } from "@/src/models/services/auth/auth.models";
import { hasRoutePermission, Resource, Action } from "./routePermissions/routePermission";

/**
 * Auxiliar para quebrar "resource:action" em { resource, action }.
 * Ex.: "comments:view" => { resource: "comments", action: "view" }
 */
function parsePermission(perm: PermissionsList): { resource: Resource; action: Action } {
  const [res, act] = perm.split(":");
  return {
    resource: res as Resource,
    action: act as Action,
  };
}

interface ProtectedRouteProps {
  /**
   * Rota que queremos proteger. Ex.: "/(private)/config/appConfig"
   * Se a rota atual (usePathname()) for diferente desta, não faremos checagem.
   */
  routePath: Route;

  /**
   * Exemplo: ["comments:view", "todos:create"].
   * Se esse array for vazio, significa que a rota não exige permissão específica.
   */
  requiredPermissions: PermissionsList[];

  /**
   * Conteúdo protegido (filhos).
   */
  children: ReactNode;

  /**
   * Rota de fallback caso o usuário não tenha permissão
   * ou não esteja autenticado. Por padrão, "/".
   */
  redirectTo?: Route;
}

/**
 * Componente que protege páginas/telas no Expo Router.
 * - Só aplica a lógica de permissão se a rota atual for igual a `routePath`.
 * - Lê 'requiredPermissions' no formato ["comments:view", "todos:create", ...],
 *   converte em { resource, action } e chama 'hasRoutePermission' para cada item.
 * - Caso falhe, redireciona automaticamente para 'redirectTo'.
 */
export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  routePath,
  requiredPermissions,
  children,
  redirectTo = "/",
}) => {
  const { user, permissions, isLoading } = useAuthAppwrite();
  const router = useRouter();

  // O Expo Router oferece usePathname() para saber qual caminho está ativo
  const pathname = usePathname();
  const isCurrentRoute = pathname === routePath;
  console.log("isCurrentRoute", isCurrentRoute);

  /**
   * Verifica se o usuário tem TODAS as permissões requisitadas.
   */
  const canAccessAll = useMemo(() => {
    if (!user) return false; // Se não houver usuário logado, sem acesso
    if (requiredPermissions.length === 0) return true; // Se não requer permissão, pode acessar

    return requiredPermissions.every((perm) => {
      const { resource, action } = parsePermission(perm);
      return hasRoutePermission(user, permissions, resource, action);
    });
  }, [user, permissions, requiredPermissions]);

  /**
   * Efeito que redireciona caso estejamos na rota protegida e falte permissão.
   */
  useEffect(() => {
    if (isCurrentRoute && !isLoading && !canAccessAll) {
      router.replace(redirectTo);
    }
  }, [isCurrentRoute, isLoading, canAccessAll, router, redirectTo]);

  // Enquanto está carregando user/permissions, não renderizamos nada (ou um loading).
  if (isLoading) {
    return null;
  }

  // Se a rota atual não for a rota alvo, apenas renderizamos os filhos.
  if (!isCurrentRoute) {
    return <>{children}</>;
  }

  // Se estamos na rota alvo, mas faltam permissões, não mostra nada (já redirecionou).
  if (!canAccessAll) {
    return null;
  }

  // Se chegou até aqui, é a rota correta e o usuário pode acessar.
  return <>{children}</>;
};
