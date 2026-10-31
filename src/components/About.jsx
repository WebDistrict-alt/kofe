import Icon from './Icon.jsx'
import Img from './Img.jsx'
import { Container, SectionHeading } from './ui.jsx'

const pillars = [
  {
    icon: 'heart',
    title: 'История',
    text: 'AROMA появилась в 2016 году как маленькая стойка на шесть мест. Мы варили кофе для соседей, запоминали их имена и любимые напитки. Сегодня у нас просторный зал, своя кондитерская — и всё та же привычка помнить гостей.',
  },
  {
    icon: 'leaf',
    title: 'Философия',
    text: 'Кофе — это повод остановиться. Мы не гонимся за скоростью конвейера: каждую чашку готовит бариста, который знает, откуда зерно и как раскрыть его вкус. Тишина, мягкий свет и время только для вас.',
  },
  {
    icon: 'award',
    title: 'Зерно',
    text: 'Работаем только со specialty-кофе с оценкой от 86 баллов SCA. Закупаем напрямую у ферм в Эфиопии, Колумбии и Бразилии и обжариваем небольшими партиями каждую неделю — чтобы в чашку попадало зерно на пике вкуса.',
  },
]

const stats = [
  { value: '2016', label: 'год основания' },
  { value: '3', label: 'фермы-партнёра' },
  { value: '12 кг', label: 'обжарки в неделю' },
  { value: '40+', label: 'тысяч чашек в год' },
]

export default function About() {
  return (
    <section id="about" className="grain relative overflow-hidden bg-espresso py-24 text-cream sm:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative order-2 lg:order-1">
            <Img
              id="1513267048331-5611cad62e41"
              alt="Бариста готовит кофе в воронках у барной стойки"
              width={900}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] w-full rounded-[28px] sm:w-4/5"
            />
            <Img
              id="1587734195503-904fca47e0e9"
              alt="Свежеобжаренные кофейные зёрна крупным планом"
              width={500}
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="absolute -bottom-10 right-0 aspect-square w-[45%] rounded-[24px] border-[6px] border-espresso shadow-2xl"
            />
            <div className="absolute left-5 top-5 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-cream text-center text-espresso shadow-xl sm:h-32 sm:w-32">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]">с</span>
              <span className="font-serif text-4xl leading-none">2016</span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em]">года</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              dark
              eyebrow="О кофейне"
              title={
                <>
                  Кофе, ради которого <em className="text-latte">хочется остаться</em>
                </>
              }
              text="Мы верим, что хорошая кофейня — это не только напиток. Это место, куда приходят за паузой, разговором и ощущением, что о тебе позаботились."
            />

            <div className="mt-12 space-y-8">
              {pillars.map((p, i) => (
                <div key={p.title} className="reveal flex gap-5" style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-caramel/40 text-caramel">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-cream">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-cream/70">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <dl className="reveal mt-28 grid grid-cols-2 gap-y-10 border-t border-cream/10 pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-5xl text-latte sm:text-6xl">{s.value}</dd>
              <dd className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/60">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
