const words = [
  'Свежая обжарка',
  'Specialty-зерно',
  'Ручная заварка',
  'Десерты собственного производства',
  'Растительное молоко без доплаты',
  'Кофе с собой',
]

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-cream/10 bg-espresso py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {row.map((w, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-serif text-xl italic text-latte sm:text-2xl">
            <span className="px-8">{w}</span>
            <span className="text-caramel">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
