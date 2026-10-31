import { formatPrice } from '../context/CartContext.jsx'
import { bestsellers } from '../data/menu.js'
import useAddToCart from '../hooks/useAddToCart.js'
import { scrollToId } from '../utils/dom.js'
import Icon from './Icon.jsx'
import Img from './Img.jsx'
import { AddButton, Container, QtyStepper, SectionHeading } from './ui.jsx'

function BestsellerCard({ product, index }) {
  const { imageRef, qty, adding, handleAdd, inc, dec } = useAddToCart(product)

  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-[28px] bg-espresso text-cream"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
        <Img
          id={product.image}
          alt={product.name}
          width={700}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full"
          imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/10 to-transparent" />
        <span className="absolute left-5 top-5 font-serif text-5xl italic text-cream/90">0{index + 1}</span>
        {product.tag && (
          <span className="absolute right-5 top-6 rounded-full bg-milk/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-espresso backdrop-blur">
            {product.tag}
          </span>
        )}
      </div>

      <div className="-mt-20 relative flex flex-1 flex-col p-6 pt-0">
        <h3 className="font-serif text-[1.9rem] leading-tight">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div>
            <p className="font-serif text-2xl">{formatPrice(product.price)}</p>
            <p className="text-xs text-cream/50">{product.volume}</p>
          </div>
          {qty > 0 ? (
            <QtyStepper qty={qty} onDec={dec} onInc={inc} name={product.name} dark />
          ) : (
            <AddButton onClick={handleAdd} adding={adding} dark label="Добавить" />
          )}
        </div>
      </div>
    </article>
  )
}

export default function Bestsellers() {
  return (
    <section id="bestsellers" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Bestsellers"
            title={
              <>
                Напитки, за которыми <em className="text-coffee">возвращаются</em>
              </>
            }
            text="Четыре позиции, которые гости заказывают чаще всего. Начните знакомство с AROMA с них."
          />
          <button
            type="button"
            onClick={() => scrollToId('menu')}
            className="reveal group inline-flex shrink-0 cursor-pointer items-center gap-3 self-start text-sm font-semibold uppercase tracking-[0.16em] text-espresso md:self-auto"
          >
            <span className="border-b border-espresso/30 pb-1 transition-colors duration-300 group-hover:border-espresso">
              Всё меню
            </span>
            <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <BestsellerCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
