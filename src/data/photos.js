const base = 'https://images.unsplash.com/photo-'

export const photo = (id, w = 800) => `${base}${id}?auto=format&fit=crop&w=${w}&q=72`

export const photoSet = (id) => [480, 800, 1200, 1600].map((w) => `${photo(id, w)} ${w}w`).join(', ')
