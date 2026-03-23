import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img className="product-card__image" src={product.image} alt={product.title} />
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__type">{product.type}</p>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ProductCard
