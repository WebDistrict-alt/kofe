import Icon from './Icon.jsx'

export const Container = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
)

export function SectionHeading({ eyebrow, title, text, dark = false, align = 'left', className = '' }) {
  const centered = align === 'center'
  return (
    <div className={`reveal ${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <p
        className={`mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] ${
          centered ? 'justify-center' : ''
        } ${dark ? 'text-caramel' : 'text-coffee'}`}
      >
        <span className={`h-px w-8 ${dark ? 'bg-caramel/60' : 'bg-coffee/40'}`} />
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-[clamp(2.4rem,5.5vw,4.25rem)] font-medium leading-[1.02] tracking-tight ${
          dark ? 'text-cream' : 'text-espresso'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-6 text-base leading-relaxed sm:text-lg ${dark ? 'text-cream/70' : 'text-muted'}`}>{text}</p>
      )}
    </div>
  )
}

export function QtyStepper({ qty, onDec, onInc, name, size = 'md', dark = false }) {
  const btn = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  return (
    <div
      className={`inline-flex items-center rounded-full border ${
        dark ? 'border-cream/25 text-cream' : 'border-espresso/15 text-espresso'
      }`}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label={`Уменьшить количество: ${name}`}
        className={`${btn} flex cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
          dark ? 'hover:bg-cream/10' : 'hover:bg-espresso/5'
        }`}
      >
        <Icon name="minus" className="h-4 w-4" />
      </button>
      <span className="min-w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`Увеличить количество: ${name}`}
        className={`${btn} flex cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ${
          dark ? 'hover:bg-cream/10' : 'hover:bg-espresso/5'
        }`}
      >
        <Icon name="plus" className="h-4 w-4" />
      </button>
    </div>
  )
}

export function AddButton({ onClick, adding, dark = false, label = 'В корзину', className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={adding}
      className={`group/btn inline-flex h-11 cursor-pointer items-center gap-2 rounded-full pl-5 pr-2 text-sm font-medium transition-colors duration-300 disabled:cursor-wait ${
        dark ? 'bg-cream text-espresso hover:bg-latte' : 'bg-espresso text-cream hover:bg-coffee'
      } ${className}`}
    >
      {adding ? 'Добавляем…' : label}
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover/btn:rotate-90 ${
          dark ? 'bg-espresso text-cream' : 'bg-cream text-espresso'
        }`}
      >
        <Icon name={adding ? 'check' : 'plus'} className="h-4 w-4" strokeWidth={2} />
      </span>
    </button>
  )
}
