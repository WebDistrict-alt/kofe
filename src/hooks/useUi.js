import { useEffect, useState } from 'react'

// Locks page scroll while an overlay is open and closes it on Escape
export function useOverlay(open, onClose) {
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
}

export function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.35
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= line) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return active
}
