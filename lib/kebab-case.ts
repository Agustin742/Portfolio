/**
 * Convierte un texto a kebab-case apto para slugs de URL.
 * Maneja camelCase ("DevEvent" -> "dev-event"), espacios
 * ("Blog API con NestJS" -> "blog-api-con-nest-js") y acentos/diacríticos
 * ("Diseño Ágil" -> "diseno-agil"). Cualquier otro carácter no alfanumérico
 * colapsa en un único guion; los guiones de los extremos se recortan.
 */
export function kebabCase(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita las marcas diacriticas (e acentuada -> e)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // separa límites camelCase
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // espacios/símbolos -> guion único
    .replace(/^-+|-+$/g, '') // sin guiones al inicio/fin
}
