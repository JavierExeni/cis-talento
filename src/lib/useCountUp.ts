import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, opts?: { duration?: number; decimals?: number }): number {
  const { duration = 1200, decimals = 0 } = opts ?? {}
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setValue(target * ease(p))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration])

  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}
