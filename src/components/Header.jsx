import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { navLinks, contacts } from '../data/site.js'
import { useActiveSection, useOverlay, useScrolled } from '../hooks/useUi.js'
import { scrollToId } from '../utils/dom.js'
import Icon from './Icon.jsx'
import { Container } from './ui.jsx'

export function Logo({ light = false, onClick }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        scrollToId('top')
      }}
      className="group flex cursor-pointer flex-col leading-none"
      aria-label="AROMA COFFEE — на главную"
    >
      <span className={`font-serif text-[1.7rem] font-semibold tracking-[0.12em] ${light ? 'text-cream' : 'text-espresso'}`}>
        AROMA
      </span>
      <span
        className={`mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.62em] ${
          light ? 'text-latte' : 'text-coffee'
        }`}
      >
        Coffee
      </span>
    </a>
  )
}

export default function Header() {
  const { count, open, cartIconRef, bumpKey } = useCart()
  const scrolled = useScrolled(40)
  const active = useActiveSection(navLinks.map((l) => l.id))
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  useOverlay(menuOpen, closeMenu)

  const light = !scrolled || menuOpen

  const go = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-500 ${
        scrolled && !menuOpen
          ? 'bg-milk/95 shadow-[0_1px_0_rgba(28,20,16,0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Logo light={light} onClick={closeMenu} />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`relative cursor-pointer py-2 text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100 ${
                    active === link.id ? 'after:scale-x-100' : ''
                  } ${light ? 'text-cream/85 hover:text-cream' : 'text-espresso/75 hover:text-espresso'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={contacts.phoneHref}
            className={`hidden cursor-pointer text-sm font-medium tracking-wide transition-colors duration-300 xl:block ${
              light ? 'text-cream/80 hover:text-cream' : 'text-espresso/70 hover:text-espresso'
            }`}
          >
            {contacts.phone}
          </a>

          <button
            ref={cartIconRef}
            type="button"
            onClick={open}
            aria-label={`Открыть корзину, товаров: ${count}`}
            className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 ${
              light
                ? 'border-cream/30 text-cream hover:bg-cream/10'
                : 'border-espresso/15 text-espresso hover:bg-espresso/5'
            }`}
          >
            <Icon name="bag" className="h-5 w-5" />
            {count > 0 && (
              <span
                key={bumpKey}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 animate-bump items-center justify-center rounded-full bg-caramel px-1 text-[0.68rem] font-semibold text-espresso"
              >
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
              light
                ? 'border-cream/30 text-cream hover:bg-cream/10'
                : 'border-espresso/15 text-espresso hover:bg-espresso/5'
            }`}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 flex flex-col bg-espresso px-5 pb-10 pt-28 transition-[opacity,visibility] duration-500 sm:px-8 lg:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Мобильная навигация">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                className={`transition-[opacity,transform] duration-700 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  className="flex cursor-pointer items-baseline justify-between border-b border-cream/10 py-4 font-serif text-4xl text-cream transition-colors duration-300 hover:text-latte"
                >
                  {link.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-cream/40">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-2 text-sm text-cream/70">
          <p>{contacts.address}</p>
          <a href={contacts.phoneHref} className="block cursor-pointer text-lg text-cream">
            {contacts.phone}
          </a>
        </div>
      </div>
    </header>
  )
}
