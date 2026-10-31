import { useState } from 'react'
import { formatPrice, useCart } from '../context/CartContext.jsx'
import { contacts } from '../data/site.js'
import { useOverlay } from '../hooks/useUi.js'
import { FREE_DELIVERY_FROM } from './CartDrawer.jsx'
import Icon from './Icon.jsx'

const DELIVERY_FEE = 199
const empty = { name: '', phone: '', method: 'pickup', address: '', time: 'asap', comment: '' }

function Field({ label, error, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#a33a2b]">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls = (error) =>
  `h-12 w-full rounded-xl border bg-milk px-4 text-base text-espresso outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-espresso ${
    error ? 'border-[#a33a2b]' : 'border-espresso/15'
  }`

export default function Checkout({ open, onClose }) {
  const { items, total, clear } = useCart()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [order, setOrder] = useState(null)

  const handleClose = () => {
    onClose()
    if (status === 'done') {
      setStatus('idle')
      setForm(empty)
      setOrder(null)
    }
  }
  useOverlay(open, handleClose)

  const delivery = form.method === 'delivery' && total < FREE_DELIVERY_FROM ? DELIVERY_FEE : 0
  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Как к вам обращаться?'
    if (form.phone.replace(/\D/g, '').length < 10) er.phone = 'Укажите телефон, чтобы мы могли подтвердить заказ'
    if (form.method === 'delivery' && form.address.trim().length < 5) er.address = 'Укажите улицу, дом и квартиру'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate() || status === 'sending') return
    setStatus('sending')
    setTimeout(() => {
      setOrder({
        number: String(Math.floor(1000 + Math.random() * 9000)),
        total: total + delivery,
        method: form.method,
        name: form.name.trim(),
      })
      clear()
      setStatus('done')
    }, 1100)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-up bg-ink/60 backdrop-blur-sm [animation-duration:.3s]" onClick={handleClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="relative max-h-[94svh] w-full max-w-2xl animate-fade-up overflow-y-auto rounded-t-[28px] bg-milk [animation-duration:.5s] sm:rounded-[28px]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-espresso/15 bg-milk transition-colors duration-200 hover:bg-espresso/5"
        >
          <Icon name="x" />
        </button>

        {status === 'done' && order ? (
          <div className="px-6 py-14 text-center sm:px-12">
            <span className="mx-auto flex h-20 w-20 animate-bump items-center justify-center rounded-full bg-espresso text-cream">
              <Icon name="check" className="h-9 w-9" strokeWidth={2} />
            </span>
            <h2 id="checkout-title" className="mt-8 font-serif text-4xl">
              Спасибо, {order.name}!
            </h2>
            <p className="mt-3 text-muted">
              Заказ <span className="font-semibold text-espresso">№ {order.number}</span> на сумму{' '}
              <span className="font-semibold text-espresso">{formatPrice(order.total)}</span> принят.
            </p>
            <p className="mx-auto mt-2 max-w-sm text-muted">
              {order.method === 'pickup'
                ? `Бариста уже взялся за дело. Заберите заказ через 15 минут: ${contacts.address}.`
                : 'Мы позвоним в течение пяти минут, чтобы подтвердить доставку.'}
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-10 inline-flex h-12 cursor-pointer items-center rounded-full bg-espresso px-8 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-coffee"
            >
              Вернуться на сайт
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
            <div className="space-y-5 p-6 pt-8 sm:p-8">
              <div>
                <h2 id="checkout-title" className="font-serif text-4xl">
                  Оформление
                </h2>
                <p className="mt-1 text-sm text-muted">Оплата при получении — картой или наличными.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-full bg-cream p-1" role="radiogroup" aria-label="Способ получения">
                {[
                  ['pickup', 'Самовывоз'],
                  ['delivery', 'Доставка'],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex h-11 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-caramel ${
                      form.method === value ? 'bg-espresso text-cream' : 'text-espresso/75 hover:text-espresso'
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={value}
                      checked={form.method === value}
                      onChange={set('method')}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>

              <Field label="Имя" id="co-name" error={errors.name}>
                <input
                  id="co-name"
                  autoComplete="given-name"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Анна"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'co-name-error' : undefined}
                  className={inputCls(errors.name)}
                />
              </Field>
              <Field label="Телефон" id="co-phone" error={errors.phone}>
                <input
                  id="co-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="+7 (900) 000-00-00"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'co-phone-error' : undefined}
                  className={inputCls(errors.phone)}
                />
              </Field>
              {form.method === 'delivery' && (
                <Field label="Адрес доставки" id="co-address" error={errors.address}>
                  <input
                    id="co-address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={set('address')}
                    placeholder="Улица, дом, квартира"
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? 'co-address-error' : undefined}
                    className={inputCls(errors.address)}
                  />
                </Field>
              )}
              <Field label="Когда" id="co-time">
                <select id="co-time" value={form.time} onChange={set('time')} className={`${inputCls()} cursor-pointer`}>
                  <option value="asap">Как можно скорее</option>
                  <option value="30">Через 30 минут</option>
                  <option value="60">Через час</option>
                </select>
              </Field>
              <Field label="Комментарий" id="co-comment">
                <textarea
                  id="co-comment"
                  rows={2}
                  value={form.comment}
                  onChange={set('comment')}
                  placeholder="Например: латте на овсяном молоке"
                  className={`${inputCls()} h-auto resize-none py-3`}
                />
              </Field>
            </div>

            <div className="flex flex-col bg-cream/70 p-6 sm:p-8 md:rounded-r-[28px]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Ваш заказ</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((i) => (
                  <li key={i.id} className="flex justify-between gap-3">
                    <span>
                      {i.name} <span className="text-muted">× {i.qty}</span>
                    </span>
                    <span className="shrink-0 tabular-nums">{formatPrice(i.qty * i.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-espresso/10 pt-4 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Доставка</span>
                  <span>{form.method === 'pickup' ? 'самовывоз' : delivery ? formatPrice(delivery) : 'бесплатно'}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-semibold">К оплате</span>
                  <span className="font-serif text-3xl tabular-nums">{formatPrice(total + delivery)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === 'sending' || items.length === 0}
                className="mt-6 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-espresso text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 hover:bg-coffee disabled:cursor-not-allowed disabled:opacity-60 md:mt-auto"
              >
                {status === 'sending' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                    Отправляем…
                  </>
                ) : (
                  'Подтвердить заказ'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
