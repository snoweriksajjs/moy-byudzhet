import { useEffect, useRef } from 'react'

export default function CursorBg() {
  const ball = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const moving = useRef(false)

  useEffect(() => {
    const startX = window.innerWidth * 0.55
    const startY = window.innerHeight * 0.3
    target.current = { x: startX, y: startY }
    pos.current = { x: startX, y: startY }

    function paint() {
      if (!ball.current) return
      ball.current.style.transform =
        `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
    }

    function tick() {
      const dx = target.current.x - pos.current.x
      const dy = target.current.y - pos.current.y
      if (dx * dx + dy * dy < 0.25) {
        moving.current = false
        raf.current = 0
        return
      }
      pos.current.x += dx * 0.16
      pos.current.y += dy * 0.16
      paint()
      raf.current = requestAnimationFrame(tick)
    }

    function onMove(e) {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!moving.current) {
        moving.current = true
        raf.current = requestAnimationFrame(tick)
      }
    }

    paint()
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className="fx" aria-hidden="true">
      <div className="fx__photo" />
      <div className="fx__mesh" />
      <div className="fx__ball" ref={ball} />
    </div>
  )
}
