import { AllRoutes, APP_ROUTES } from "@/src/routes/routes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Route } from "expo-router";





/**

 * 4) Extraímos as chaves do tipo AllRoutes. ( "HOME" | "ABOUT" | ...)
 */
type RouteKeys = keyof AllRoutes;

/**
 * 5) Extraímos o tipo de `params` para cada rota:
 *    - Se a rota tiver params, é um Record<string, string>.
 *    - Se não tiver, é undefined.
 */
type RouteParams<T extends RouteKeys> = AllRoutes[T]["params"];

/**
 * 6) Criamos uma função auxiliar para montar o `pathname + querystring`
 *    evitando o problema do `UnknownInputParams` ao usar `router.push({ pathname, params })`.
 */
function createUrl(path: string, params?: Record<string, string>): string {
  if (!params) return path;
  const qs = new URLSearchParams(params).toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * 7) O Hook "useTypedNavigation" retorna uma função `navigate(...)`
 *    que usa um OBJETO para diferenciar rotas com e sem params.
 *    Esse approach resolve as limitações do TS com rest parameters.
 */

export function useTypedSearchParams<T extends RouteKeys>(
  routeKey: T
): RouteParams<T> {
  const rawParams = useLocalSearchParams();
  const shape = APP_ROUTES[routeKey].params;

  // 1) Se a rota não tiver params, retorne `undefined`.
  if (!shape) {
    return undefined as RouteParams<T>;
  }

  // 2) Se tiver, crie um objeto tipado.
  const typedObj: Record<string, string> = {};

  for (const key of Object.keys(shape)) {
    typedObj[key] =
      typeof rawParams[key] === "string" ? String(rawParams[key]) : "";
  }

  // 3) Retorne como RouteParams<T> sem forçar "unknown".
  return typedObj as unknown as RouteParams<T>;

  /*example usage 

  const params = useTypedSearchParams('MYROUTE');


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>dsds: {params?.dsds}</Text>
  */
}

/**
 * Montamos um tipo que, para cada rota T:
 *   - Se "RouteParams<T>" for undefined, então NÃO aceitamos a chave "params".
 *   - Se "RouteParams<T>" for algo (ex.: { userId: string }), então OBRIGAMOS a ter a chave "params".
 */

type NavigationObject<T extends RouteKeys> =
  // Se a rota não tiver params, não pedimos "params"
  // mas aceitamos "replace" opcional.
  RouteParams<T> extends undefined
    ? { route: T; replace?: boolean }
    : // Se a rota tiver params, pedimos "params" e aceitamos "replace"
      { route: T; params: RouteParams<T>; replace?: boolean };

export function useTypedNavigation() {
  const router = useRouter();

  function navigate<T extends RouteKeys>(obj: NavigationObject<T>) {
    const config = APP_ROUTES[obj.route];
    // Se a rota tiver params, pegamos do objeto. Se não tiver, fica undefined.
    const userParams = "params" in obj ? obj.params : undefined;

    const url = createUrl(config.path, userParams);

    if (obj.replace) {
      // Se replace = true, use router.replace
      router.replace(url as Route);
    } else {
      // Caso contrário, usa router.push
      router.push(url as Route);
    }
  }

  return { navigate };
}
