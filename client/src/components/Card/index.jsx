import './index.scss'

const Card = ({product}) => {
  return (
    <div className='card'>
      <img src={'http://localhost:8000/api' + product.image} alt={product.name} />
      <p className='name'>{product.name.toUpperCase()}</p>
      <p className='price'>BDT {product.price}</p>
      <div className='card-btn'>
        <button className='buy-now'>BUY NOW</button>
        <button className='add-cart'>ADD TO CART</button>
      </div>
    </div>
  )
} 

export default Card