import { useEffect, useRef } from "react"

export function useClickOutside(aberto, aoFechar) {
  const ref = useRef(null)

  useEffect(() => {
    if (!aberto) return

    function handleClick(evento) {
      if (ref.current && !ref.current.contains(evento.target)) {
        aoFechar()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [aberto, aoFechar])

  return ref
}