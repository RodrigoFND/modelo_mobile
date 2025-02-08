export type NestedKeys<T, Prefix extends string = ""> = {
  [K in Extract<keyof T, string>]: T[K] extends object
    ? NestedKeys<T[K], `${Prefix}${K}.`> // Continua recursão
    : `${Prefix}${K}`; // Apenas adiciona chaves finais (não objetos)
}[Extract<keyof T, string>];

export function generateMappedProperties<T extends object>(
  obj: T,
  prefix = ""
): Record<string, string> {
  // ⚠️ Aqui usamos `Record<string, string>` para evitar inferência excessiva

  return Object.keys(obj).reduce((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = (obj as any)[key]; // ⚠️ Aqui usamos `any` para evitar problemas com recursão profunda

    if (typeof value === "object" && value !== null) {
      Object.assign(acc, generateMappedProperties(value, fullKey));
    } else {
      acc[fullKey] = value;
    }

    return acc;
  }, {} as Record<string, string>);
}
