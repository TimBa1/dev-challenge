import { useRef } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.css'

function ProductCarousel({ products, title, variant = 'default' }) {
  const trackRef = useRef(null)

  const handleScroll = (direction) => {
    if (!trackRef.current) return

    const scrollAmount = trackRef.current.clientWidth * direction
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className={`carousel carousel--${variant}`} aria-label={title}>
      <h2 className="carousel__title">{title}</h2>

      <button
        className="carousel__nav carousel__nav--prev"
        type="button"
        aria-label={`Scroll ${title} left`}
        onClick={() => handleScroll(-1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 4 7 12l8 8" />
        </svg>
      </button>

      <div ref={trackRef} className="carousel__track">
        {products.map((product) => (
          <div key={product.id} className="carousel__item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        className="carousel__nav carousel__nav--next"
        type="button"
        aria-label={`Scroll ${title} right`}
        onClick={() => handleScroll(1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 4 8 8-8 8" />
        </svg>
      </button>
    </section>
  )
}

export default ProductCarousel
