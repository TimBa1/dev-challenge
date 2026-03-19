import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.css'

function ProductCarousel({ products, title }) {
  return (
    <div className="carousel">
      <h2>{title}</h2>

      <div className="carousel__track">
        {products.map((product) => (
          <div key={product.id} className="carousel__item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
