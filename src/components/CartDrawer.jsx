import { formatPrice, useCart } from '../context/CartContext.jsx'
import { useOverlay } from '../hooks/useUi.js'
import { scrollToId } from '../utils/dom.js'
import Icon from './Icon.jsx'
import Img from './Img.jsx'
import { QtyStepper } from './ui.jsx'

export const FREE_DELIVERY_FROM = 1500

const plural = (n) => {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'позиция'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'позиции'
  return 'позиций'
}

export default function CartDrawer({ onCheckout }) {
  const { items, count, total, isOpen, close, inc, dec, remove, clear } = useCart()
  useOverlay(isOpen, close)
  const left = FREE_DELIVERY_FROM - total

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-milk shadow-2xl transition-transform duration-500 ease-[var(--ease-soft)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <div>
            <h2 className="font-serif text-3xl">Ваш заказ</h2>
            <p className="text-sm text-muted">
              {count > 0 ? `${count} ${plural(count)}` : 'Пока ничего не выбрано'}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть корзину"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-espresso/15 transition-colors duration-200 hover:bg-espresso/5"
          >
            <Icon name="x" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-coffee">
              <Icon name="coffee" className="h-9 w-9" strokeWidth={1.3} />
            </span>
            <p className="mt-6 font-serif text-2xl">Корзина пока пуста</p>
            <p className="mt-2 text-muted">Загляните в меню — там ждут свежий раф и тирамису, приготовленный этим утром.</p>
            <button
              type="button"
              onClick={() => {
                close()
                scrollToId('menu')
              }}
              className="mt-8 inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-espresso px-7 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-coffee"
            >
              Перейти в меню
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-espresso/10 px-6 py-4">
              <p className="text-sm text-muted">
                {left > 0 ? (
                  <>
                    До бесплатной доставки — <span className="font-semibold text-espresso">{formatPrice(left)}</span>
                  </>
                ) : (
                  <span className="font-semibold text-espresso">Доставка будет бесплатной</span>
                )}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-latte/50">
                <div
                  className="h-full origin-left rounded-full bg-coffee transition-transform duration-500"
                  style={{ transform: `scaleX(${Math.min(1, total / FREE_DELIVERY_FROM)})` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-espresso/10 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <Img id={item.image} alt={item.name} width={200} sizes="80px" className="h-20 w-20 shrink-0 rounded-2xl" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-serif text-xl leading-tight">{item.name}</h3>
                        <p className="text-xs text-muted">
                          {item.volume} · {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        aria-label={`Удалить ${item.name}`}
                        className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-espresso/5 hover:text-espresso"
                      >
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyStepper
                        size="sm"
                        qty={item.qty}
                        onDec={() => dec(item.id)}
                        onInc={() => inc(item.id)}
                        name={item.name}
                      />
                      <span className="font-semibold tabular-nums">{formatPrice(item.qty * item.price)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-espresso/10 bg-cream/50 px-6 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm uppercase tracking-[0.16em] text-muted">Итого</span>
                <span className="font-serif text-4xl tabular-nums">{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                onClick={onCheckout}
                className="mt-5 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-espresso text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-coffee"
              >
                Оформить заказ
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full cursor-pointer py-2 text-sm text-muted transition-colors duration-200 hover:text-espresso"
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
