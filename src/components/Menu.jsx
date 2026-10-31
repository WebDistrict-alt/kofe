import { useState } from 'react'
import { formatPrice } from '../context/CartContext.jsx'
import { categories, products } from '../data/menu.js'
import useAddToCart from '../hooks/useAddToCart.js'
import Img from './Img.jsx'
import { AddButton, Container, QtyStepper, SectionHeading } from './ui.jsx'

function ProductCard({ product, index }) {
  const { imageRef, qty, adding, handleAdd, inc, dec } = useAddToCart(product)

  return (
    <article className="group flex animate-fade-up flex-col" style={{ animationDelay: `${index * 70}ms` }}>
      <div ref={imageRef} className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
        <Img
          id={product.image}
          alt={product.name}
          width={640}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full"
          imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
        />
        {product.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-milk/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-espresso backdrop-blur">
            {product.tag}
          </span>
        )}
        <span className="absolute bottom-4 right-4 rounded-full bg-espresso/70 px-3 py-1 text-xs text-cream backdrop-blur">
          {product.volume}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[1.65rem] leading-tight text-espresso">{product.name}</h3>
          <p className="shrink-0 font-serif text-2xl text-coffee">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{product.description}</p>
        <div className="mt-auto pt-5">
          {qty > 0 ? (
            <div className="flex items-center gap-4">
              <QtyStepper qty={qty} onDec={dec} onInc={inc} name={product.name} />
              <span className="text-sm text-muted">в корзине</span>
            </div>
          ) : (
            <AddButton onClick={handleAdd} adding={adding} />
          )}
        </div>
      </div>
    </article>
  )
}

export default function Menu() {
  const [active, setActive] = useState(categories[0].id)
  const current = categories.find((c) => c.id === active)
  const items = products.filter((p) => p.category === active)

  const onKeyDown = (e) => {
    const i = categories.findIndex((c) => c.id === active)
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length
    setActive(categories[next].id)
    document.getElementById(`tab-${categories[next].id}`)?.focus()
  }

  return (
    <section id="menu" className="bg-cream/60 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Меню"
          align="center"
          title={
            <>
              Готовим медленно, <em className="text-coffee">чтобы вы не спешили</em>
            </>
          }
          text="Зерно свежей обжарки, молоко от фермы в Подмосковье и выпечка из нашей кухни. Растительное молоко — без доплаты."
        />

        <div className="reveal mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Категории меню"
            onKeyDown={onKeyDown}
            className="no-scrollbar -mx-5 flex max-w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 sm:mx-0 sm:max-w-full sm:flex-wrap sm:justify-center sm:px-0"
          >
            {categories.map((c) => {
              const selected = c.id === active
              return (
                <button
                  key={c.id}
                  id={`tab-${c.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  className={`h-11 shrink-0 cursor-pointer rounded-full border px-5 text-sm font-medium transition-colors duration-300 ${
                    selected
                      ? 'border-espresso bg-espresso text-cream'
                      : 'border-espresso/15 text-espresso/80 hover:border-espresso/40 hover:text-espresso'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-14">
          <h3 className="sr-only">{current.label}</h3>
          <div key={active} className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
