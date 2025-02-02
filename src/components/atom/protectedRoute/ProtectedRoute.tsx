/* import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuthAppwrite } from "@/src/providers/authAppwrite/AuthAppwrite";
import { RoutesConfig } from "@/src/routes/config";

type ProtectedRouteProps = {
  route: RoutesConfig;
  name: string;
  options?: any;
};

export default function ProtectedRoute({ route, name, options }: ProtectedRouteProps) {
  const { permissions } = useAuthAppwrite();
  const router = useRouter();

  const hasAccess = route.permissions.length === 0 || route.permissions.every((perm) => permissions.includes(perm));

  useEffect(() => {
    if (!hasAccess && route.redirect) {
      router.replace(route.redirect as any);
    }
  }, [hasAccess, router]);

  if (!hasAccess) {
    return null; // 🔹 Não renderiza nada se não tiver permissão
  }

  return <Stack.Screen name={name} options={options} />;
}
 */