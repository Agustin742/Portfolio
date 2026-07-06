'use client'

import { useEffect, useMemo, useState } from 'react'

/** Zona horaria del reloj (Buenos Aires). Única fuente de verdad del hook. */
const TIME_ZONE = 'America/Argentina/Buenos_Aires'
/** Placeholder hydration-safe: se muestra en SSR y hasta el primer tick. */
const TIME_PLACEHOLDER = '--:--:--'

/**
 * Reloj en vivo (HH:MM:SS) en la zona horaria de Buenos Aires, formateado según
 * `locale`. Devuelve `--:--:--` en SSR y en el primer render de hidratación para
 * evitar mismatch; a partir del `useEffect` avanza cada segundo. Cleanup del
 * `setInterval` incluido. Mismo mecanismo que el reloj del Hero, extraído acá
 * para reusar sin duplicar (bajo acoplamiento).
 */
export function useLocalClock(locale: string): string {
  const [time, setTime] = useState(TIME_PLACEHOLDER)

  // Memoizado por `locale`: reconstruir el formatter en cada tick es caro y no
  // hace falta (el patrón cambia solo con el idioma). No se puede hoistear a
  // scope de módulo porque `locale` es un parámetro variable del hook.
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        timeZone: TIME_ZONE,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    [locale],
  )

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [formatter])

  return time
}
