import { formatPrice, useCart } from '../context/CartContext.jsx'
import { productsById } from '../data/menu.js'
import Icon from './Icon.jsx'
import Img from './Img.jsx'

// Toast after adding a product + sticky cart bar on mobile
export default function CartFeedback() {
  const { toast, dismissToast, open, count, total, isOpen } = useCart()
  const product = toast && productsById[toast.id]

  return (
    <>
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 sm:bottom-8 sm:justify-end sm:px-8"
      >
        {product && !isOpen && (
          <div
            key={toast.key}
            className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-center gap-4 rounded-2xl bg-espresso p-3 pr-4 text-cream shadow-2xl [animation-duration:.5s]"
          >
            <Img id={product.image} alt="" width={120} sizes="56px" className="h-14 w-14 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-caramel">
                <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.2} /> Добавлено
              </p>
              <p className="truncate font-serif text-lg">{product.name}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                dismissToast()
                open()
              }}
              className="h-10 shrink-0 cursor-pointer rounded-full bg-cream px-4 text-xs font-semibold text-espresso transition-colors duration-200 hover:bg-latte"
            >
              Корзина
            </button>
          </div>
        )}
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 p-4 transition-transform duration-500 ease-[var(--ease-soft)] sm:hidden ${
          count > 0 && !isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          type="button"
          onClick={open}
          tabIndex={count > 0 ? 0 : -1}
          className="flex h-14 w-full cursor-pointer items-center justify-between rounded-full bg-espresso pl-6 pr-2 text-cream shadow-[0_18px_40px_-12px_rgba(15,11,9,0.6)]"
        >
          <span className="flex items-center gap-3 text-sm font-semibold">
            <Icon name="bag" className="h-5 w-5" />
            Корзина · {count}
          </span>
          <span className="flex h-10 items-center rounded-full bg-cream px-4 text-sm font-semibold text-espresso tabular-nums">
            {formatPrice(total)}
          </span>
        </button>
      </div>
    </>
  )
}
