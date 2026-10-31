const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`)
}

// Flies a round thumbnail from the product image to the cart icon along an arc.
// Always resolves, so callers can chain the actual cart update after it.
export function flyToCart(fromEl, toEl, imageUrl) {
  if (!fromEl || !toEl || reducedMotion() || !fromEl.animate) return Promise.resolve()

  const a = fromEl.getBoundingClientRect()
  const b = toEl.getBoundingClientRect()
  const size = Math.min(a.width, a.height, 110)
  const startX = a.left + a.width / 2
  const startY = a.top + a.height / 2
  const dx = b.left + b.width / 2 - startX
  const dy = b.top + b.height / 2 - startY

  const dot = document.createElement('div')
  Object.assign(dot.style, {
    position: 'fixed',
    left: `${startX - size / 2}px`,
    top: `${startY - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '9999px',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '3px solid #f8f3ec',
    boxShadow: '0 18px 40px -12px rgba(15, 11, 9, 0.55)',
    zIndex: 80,
    pointerEvents: 'none',
    willChange: 'transform, opacity',
  })
  document.body.appendChild(dot)

  const lift = Math.min(160, Math.abs(dy) * 0.35 + 60)
  const anim = dot.animate(
    [
      { transform: 'translate(0, 0) scale(0.6)', opacity: 0 },
      { transform: 'translate(0, -12px) scale(1)', opacity: 1, offset: 0.15 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - lift}px) scale(0.6)`, opacity: 1, offset: 0.6 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0.6 },
    ],
    { duration: 850, easing: 'cubic-bezier(0.45, 0, 0.25, 1)' },
  )
  return anim.finished.catch(() => {}).finally(() => dot.remove())
}
