import { useState } from 'react'
import About from './components/About.jsx'
import Bestsellers from './components/Bestsellers.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CartFeedback from './components/CartFeedback.jsx'
import Checkout from './components/Checkout.jsx'
import Contacts from './components/Contacts.jsx'
import Footer from './components/Footer.jsx'
import Gallery from './components/Gallery.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Menu from './components/Menu.jsx'
import { useCart } from './context/CartContext.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  const { close } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  useReveal()

  return (
    <>
      <a
        href="#menu"
        className="sr-only z-[100] rounded-full bg-espresso px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Перейти к меню
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Bestsellers />
        <Menu />
        <About />
        <Gallery />
        <Contacts />
      </main>
      <Footer />
      <CartDrawer
        onCheckout={() => {
          close()
          setCheckoutOpen(true)
        }}
      />
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <CartFeedback />
    </>
  )
}
