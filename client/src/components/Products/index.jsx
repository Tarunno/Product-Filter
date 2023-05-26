import './index.scss'
import Card from '../Card'

const Products = ({products}) => {
  return (
    <div className='products'>
      {products.map((product) => {
        return <Card key={product.id} product={product}/>
      })}    
    </div>
  )
}

export default Products