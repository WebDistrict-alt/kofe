import { contacts } from '../data/site.js'
import Icon from './Icon.jsx'
import { Container, SectionHeading } from './ui.jsx'

function openStatus(now = new Date()) {
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  const today = contacts.hours.find((h) => h.days.includes(day))
  const isOpen = hour >= today.open && hour < today.close
  const fmt = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`
  return isOpen ? { isOpen, text: `Открыто до ${fmt(today.close)}` } : { isOpen, text: 'Сейчас закрыто' }
}

export default function Contacts() {
  const { lat, lon } = contacts
  const d = 0.006
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d * 1.8}%2C${lat - d}%2C${lon + d * 1.8}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lon}`
  const routeHref = `https://yandex.ru/maps/?rtext=~${lat}%2C${lon}&rtt=auto`
  const status = openStatus()
  const today = new Date().getDay()

  return (
    <section id="contacts" className="bg-cream/60 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Контакты"
          title={
            <>
              Ждём вас <em className="text-coffee">в центре Москвы</em>
            </>
          }
          text="Тихая улица у Патриарших прудов, большие окна и стол у камина. Заходите на чашку — или закажите с собой."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="reveal space-y-4 lg:col-span-2">
            <div className="rounded-[24px] bg-milk p-7">
              <div className="flex items-start gap-4">
                <Icon name="pin" className="mt-1 h-5 w-5 shrink-0 text-coffee" />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Адрес</h3>
                  <p className="mt-2 font-serif text-2xl leading-snug">{contacts.address}</p>
                  <p className="mt-1 text-sm text-muted">{contacts.metro}</p>
                  <a
                    href={routeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-espresso"
                  >
                    <Icon name="navigation" className="h-4 w-4" />
                    <span className="border-b border-espresso/30 transition-colors duration-300 group-hover:border-espresso">
                      Построить маршрут
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-milk p-7">
              <div className="flex items-start gap-4">
                <Icon name="clock" className="mt-1 h-5 w-5 shrink-0 text-coffee" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">График работы</h3>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                        status.isOpen ? 'bg-[#e4ecdc] text-[#3d5a2a]' : 'bg-latte/50 text-roast'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? 'bg-[#4f7a35]' : 'bg-coffee'}`} />
                      {status.text}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-2">
                    {contacts.hours.map((h) => (
                      <div
                        key={h.label}
                        className={`flex justify-between border-b border-espresso/10 pb-2 last:border-0 ${
                          h.days.includes(today) ? 'font-semibold text-espresso' : 'text-muted'
                        }`}
                      >
                        <dt>{h.label}</dt>
                        <dd className="tabular-nums">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-espresso p-7 text-cream">
              <div className="flex items-start gap-4">
                <Icon name="phone" className="mt-1 h-5 w-5 shrink-0 text-caramel" />
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">Телефон</h3>
                  <a
                    href={contacts.phoneHref}
                    className="mt-2 block cursor-pointer font-serif text-3xl transition-colors duration-300 hover:text-latte"
                  >
                    {contacts.phone}
                  </a>
                  <p className="mt-1 text-sm text-cream/60">Бронь столов и заказ тортов</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2 border-t border-cream/10 pt-6">
                {contacts.socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={`${s.name}: ${s.handle}`}
                      className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-cream/20 px-4 text-sm transition-colors duration-300 hover:border-cream/60 hover:bg-cream/10"
                    >
                      <Icon name={s.icon} className="h-4 w-4" />
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal relative min-h-[420px] overflow-hidden rounded-[24px] bg-latte lg:col-span-3">
            <iframe
              title={`Карта: AROMA COFFEE, ${contacts.address}`}
              src={mapSrc}
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0 [filter:sepia(.35)_saturate(.75)_contrast(.95)] transition-[filter] duration-700 hover:[filter:none]"
            />
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-espresso px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream shadow-lg">
              AROMA COFFEE
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
