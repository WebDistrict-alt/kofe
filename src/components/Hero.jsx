import { scrollToId } from '../utils/dom.js'
import Icon from './Icon.jsx'
import Img from './Img.jsx'
import { Container } from './ui.jsx'

const facts = [
  { value: '7 дней', label: 'от обжарки до чашки' },
  { value: '86+', label: 'баллов SCA у наших зёрен' },
  { value: '100%', label: 'десертов — свои' },
]

export default function Hero() {
  return (
    <section id="top" className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 -z-10">
        <Img
          id="1497515114629-f71d768fd07c"
          alt="Чашка горячего кофе с паром на россыпи кофейных зёрен"
          eager
          width={1600}
          sizes="100vw"
          className="h-full w-full bg-ink"
          imgClassName="animate-slow-zoom object-[70%_center] lg:object-[100%_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/65 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />
      </div>

      <Container className="pb-14 pt-36 sm:pb-20 lg:pb-24">
        <p
          className="mb-8 flex animate-fade-up items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-latte"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="h-px w-10 bg-latte/60" />
          Specialty coffee · Москва · с 2016
        </p>

        <h1
          className="animate-fade-up font-serif text-[clamp(3.2rem,8.5vw,7.25rem)] font-medium leading-[0.9] tracking-tight"
          style={{ animationDelay: '0.2s' }}
        >
          ТВОЁ ВРЕМЯ.
          <br />
          <span className="italic text-latte">ТВОЙ КОФЕ.</span>
        </h1>

        <p
          className="mt-8 max-w-md animate-fade-up text-lg leading-relaxed text-cream/80 sm:text-xl"
          style={{ animationDelay: '0.35s' }}
        >
          Место, где каждый глоток превращается в маленькое удовольствие.
        </p>

        <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row" style={{ animationDelay: '0.5s' }}>
          <button
            type="button"
            onClick={() => scrollToId('menu')}
            className="group inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-cream px-8 text-sm font-semibold uppercase tracking-[0.14em] text-espresso transition-colors duration-300 hover:bg-latte"
          >
            Посмотреть меню
            <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => scrollToId('contacts')}
            className="inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full border border-cream/35 px-8 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10"
          >
            <Icon name="pin" className="h-4 w-4" />
            Найти нас
          </button>
        </div>

        <dl
          className="mt-16 grid max-w-2xl animate-fade-up grid-cols-3 gap-4 border-t border-cream/15 pt-8 sm:gap-10"
          style={{ animationDelay: '0.7s' }}
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-3xl text-cream sm:text-4xl">{f.value}</dd>
              <dd className="mt-1 text-xs leading-snug text-cream/65 sm:text-sm">{f.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
