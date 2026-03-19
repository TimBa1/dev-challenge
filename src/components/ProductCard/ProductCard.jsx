import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div>
        <h3>{product.title}</h3>
        <p>{product.type}</p>
        <p>${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
