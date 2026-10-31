import { contacts, navLinks } from '../data/site.js'
import { scrollToId } from '../utils/dom.js'
import { Logo } from './Header.jsx'
import Icon from './Icon.jsx'
import { Container } from './ui.jsx'

export default function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-20 text-cream sm:pb-10">
      <Container>
        <div className="grid gap-12 border-b border-cream/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-cream/80">
              Твоё время. Твой кофе. Приходите за паузой — остаётесь за атмосферой.
            </p>
          </div>
          <nav aria-label="Навигация в подвале">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">Разделы</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(l.id)
                    }}
                    className="cursor-pointer text-cream/80 transition-colors duration-300 hover:text-cream"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">Мы на связи</h3>
            <ul className="mt-5 space-y-3 text-cream/80">
              <li>{contacts.address}</li>
              <li>
                <a href={contacts.phoneHref} className="cursor-pointer transition-colors duration-300 hover:text-cream">
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="cursor-pointer transition-colors duration-300 hover:text-cream">
                  {contacts.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-sm text-cream/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AROMA COFFEE. Сделано с любовью к кофе.</p>
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="group inline-flex cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-cream"
          >
            Наверх
            <Icon name="arrowUpRight" className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
