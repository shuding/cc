import { useState, useEffect, useRef } from 'react'

export default (interval = 1000 / 60) => {
  const [t, setT] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    let timer
    const tick = () => {
      if (!paused.current) {
        setT((t) => {
          if (t > 1000000) t = 0
          return t + interval
        })
      }
      timer = setTimeout(tick, interval)
    }
    tick()

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return [t, () => (paused.current = !paused.current)]
}
