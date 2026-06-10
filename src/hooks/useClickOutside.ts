import { RefObject, useEffect } from "react"

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  enabled = true
) => {

  useEffect(() => {

    if (!enabled) return

    const handlePointerDown = (event: PointerEvent) => {
        
      const target = event.target as Node

      if (
        ref.current &&
        !ref.current.contains(target)
      ) {
        callback()
      }

    }

    window.addEventListener("pointerdown", handlePointerDown)

    return () => {
      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      )
    }
  }, [ref, callback, enabled])

}

export default useClickOutside