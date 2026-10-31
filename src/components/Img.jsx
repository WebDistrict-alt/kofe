import { useState } from 'react'
import { photo, photoSet } from '../data/photos.js'
import Icon from './Icon.jsx'

// Unsplash image with responsive srcset, lazy loading, fade-in and a graceful fallback
export default function Img({
  id,
  alt,
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 33vw, 100vw',
  width = 800,
  eager = false,
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center text-coffee/50">
          <Icon name="coffee" className="h-10 w-10" />
        </div>
      ) : (
        <img
          src={photo(id, width)}
          srcSet={photoSet(id)}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
