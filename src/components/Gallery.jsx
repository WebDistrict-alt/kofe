import { useCallback, useEffect, useState } from 'react'
import { gallery, galleryCategories } from '../data/site.js'
import { photo } from '../data/photos.js'
import { useOverlay } from '../hooks/useUi.js'
import Icon from './Icon.jsx'
import Img from './Img.jsx'
import { Container, SectionHeading } from './ui.jsx'

const ratios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[4/3]']

function Lightbox({ items, index, onClose, onNav }) {
  const open = index !== null
  useOverlay(open, onClose)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onNav])

  if (!open) return null
  const item = items[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      className="fixed inset-0 z-[60] flex animate-fade-up items-center justify-center bg-ink/95 p-4 [animation-duration:.4s]"
      onClick={onClose}
    >
      <img
        key={item.id}
        src={photo(item.id, 1600)}
        alt={item.alt}
        className="max-h-[82vh] max-w-full animate-fade-up rounded-2xl object-contain [animation-duration:.5s]"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-6 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 text-center text-sm text-cream/70">
        {item.alt} · {index + 1} / {items.length}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть просмотр"
        className="absolute right-4 top-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-200 hover:bg-cream/20"
      >
        <Icon name="x" />
      </button>
      {['chevronLeft', 'chevronRight'].map((dir, i) => (
        <button
          key={dir}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNav(i === 0 ? -1 : 1)
          }}
          aria-label={i === 0 ? 'Предыдущее фото' : 'Следующее фото'}
          className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-200 hover:bg-cream/20 ${
            i === 0 ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
          }`}
        >
          <Icon name={dir} />
        </button>
      ))}
    </div>
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [index, setIndex] = useState(null)
  const items = filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)

  const close = useCallback(() => setIndex(null), [])
  const nav = useCallback((step) => setIndex((i) => (i + step + items.length) % items.length), [items.length])

  return (
    <section id="gallery" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Галерея"
            title={
              <>
                Атмосфера, которую <em className="text-coffee">хочется сохранить</em>
              </>
            }
            text="Интерьер, ремесло бариста, наши десерты и тёплые вечера — загляните к нам до того, как придёте."
          />
          <div className="reveal no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {galleryCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
                className={`h-11 shrink-0 cursor-pointer rounded-full border px-5 text-sm font-medium transition-colors duration-300 ${
                  filter === c.id
                    ? 'border-espresso bg-espresso text-cream'
                    : 'border-espresso/15 text-espresso/80 hover:border-espresso/40 hover:text-espresso'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div key={filter} className="mt-14 columns-2 gap-4 sm:gap-5 lg:columns-4">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Открыть фото: ${item.alt}`}
              className="group relative mb-4 block w-full animate-fade-up cursor-pointer break-inside-avoid overflow-hidden rounded-[20px] sm:mb-5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Img
                id={item.id}
                alt={item.alt}
                width={600}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={`w-full ${ratios[i % ratios.length]}`}
                imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 text-left text-sm text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.alt}
              </span>
            </button>
          ))}
        </div>
      </Container>

      <Lightbox items={items} index={index} onClose={close} onNav={nav} />
    </section>
  )
}
