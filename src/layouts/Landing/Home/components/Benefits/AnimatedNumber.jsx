import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

export default function AnimatedNumber({ value, duration = 2, decimals = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = prefix + v.toFixed(decimals) + suffix
          }
        },
      })
      return () => controls.stop()
    }
  }, [isInView, value, duration, decimals, prefix, suffix])

  return <span ref={ref}>{prefix}0{decimals > 0 ? '.' + '0'.repeat(decimals) : ''}{suffix}</span>
}
