import { useState, useEffect } from 'react'

export default function useWindowSize() {
  const [size, setSize] = useState({})
  useEffect(() => {
    function onResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    onResize()

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}
