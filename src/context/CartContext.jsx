import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { productsById } from '../data/menu.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'aroma-cart'

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, [action.id]: (state[action.id] || 0) + 1 }
    case 'dec': {
      const qty = (state[action.id] || 0) - 1
      const next = { ...state }
      if (qty <= 0) delete next[action.id]
      else next[action.id] = qty
      return next
    }
    case 'remove': {
      const next = { ...state }
      delete next[action.id]
      return next
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return Object.fromEntries(Object.entries(saved).filter(([id, qty]) => productsById[id] && qty > 0))
  } catch {
    return {}
  }
}

export function CartProvider({ children }) {
  const [quantities, dispatch] = useReducer(reducer, undefined, loadCart)
  const [isOpen, setOpen] = useState(false)
  const [bumpKey, setBumpKey] = useState(0)
  const [toast, setToast] = useState(null)
  const cartIconRef = useRef(null)
  const toastTimer = useRef()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities))
    } catch {
      /* storage unavailable — cart still works in memory */
    }
  }, [quantities])

  const items = useMemo(
    () => Object.entries(quantities).map(([id, qty]) => ({ ...productsById[id], qty })),
    [quantities],
  )
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0)

  const add = useCallback((id) => {
    dispatch({ type: 'add', id })
    setBumpKey((k) => k + 1)
    clearTimeout(toastTimer.current)
    setToast({ id, key: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const value = {
    items,
    count,
    total,
    quantities,
    add,
    inc: (id) => dispatch({ type: 'add', id }),
    dec: (id) => dispatch({ type: 'dec', id }),
    remove: (id) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    bumpKey,
    toast,
    dismissToast: () => setToast(null),
    cartIconRef,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

export const formatPrice = (n) => `${n.toLocaleString('ru-RU')} ₽`
