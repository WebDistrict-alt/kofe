import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { photo } from '../data/photos.js'
import { flyToCart } from '../utils/dom.js'

export default function useAddToCart(product) {
  const { quantities, add, inc, dec, cartIconRef } = useCart()
  const imageRef = useRef(null)
  const [adding, setAdding] = useState(false)

  const handleAdd = () => {
    if (adding) return
    setAdding(true)
    flyToCart(imageRef.current, cartIconRef.current, photo(product.image, 200)).then(() => {
      add(product.id)
      setAdding(false)
    })
  }

  return {
    imageRef,
    qty: quantities[product.id] || 0,
    adding,
    handleAdd,
    inc: () => inc(product.id),
    dec: () => dec(product.id),
  }
}
