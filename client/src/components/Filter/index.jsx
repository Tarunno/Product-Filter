import './index.scss'
import Products from '../Products'
import { useEffect, useState } from 'react'
import { getAttrs, getWarranty } from '../../api/productApi'

const Filter = ({filters, setFilters, products}) => {

  const [brands, setBrands] = useState([])
  const [types, setTypes] = useState([])
  const [sellers, setSellers] = useState([])
  const [warranties, setWarranties] = useState([])

  const [startingPrice, setStartingPrice] = useState()
  const [endingPrice, setEndinPrice] = useState()

  const loadAttrs = async() => {
    let data = await getAttrs('brands')
    setBrands(data)
    data = await getAttrs('sellers')
    setSellers(data)
    data = await getAttrs('types')
    setTypes(data)
    data = await getWarranty()
    setWarranties(data)
  }

  useEffect(() => {
    loadAttrs()
  }, [])

  return (
    <div className='filter'>
      <div className='sidebar'>

        <p className='heading'>PRICE</p>
        <div className='price-inputs'>
          <input type="number" onChange={(e) => setStartingPrice(e.target.value)}/>
          <p>to</p>
          <input type="number" onChange={(e) => setEndinPrice(e.target.value)}/>
          <button onClick={() => setFilters({
            ...filters,
            'starting_price': startingPrice,
            'ending_price': endingPrice
          })} className='price-filter-btn'>GO</button>
        </div>
        <div className='hr'></div>

        <p className='heading'>BRANDS</p>
        {brands.map((brand) => {
          return <div className='brand-filter' key={brand.id}>
            <input type="checkbox" id="myCheckbox" value={brand.name} onChange={(e) => {
              let index = filters['brand'].indexOf(e.target.value)
              let temp = e.target.value
              if(index != -1){
                setFilters({
                  ...filters,
                  'brand': filters['brand'].filter((x) => x !== temp)
                })
              }
              else{
                setFilters({
                  ...filters,
                  'brand': [...filters['brand'], e.target.value]
                })
              }
            }}/>
            <label> {brand.name}</label>
          </div>
        })} 
        <div className='hr'></div>

        <p className='heading'>TYPES</p>
        {types.map((type) => {
          return <div className='brand-filter' key={type.id}>
            <input type="checkbox" id="myCheckbox" value={type.name} onChange={(e) => {
              let index = filters['type'].indexOf(e.target.value)
              let temp = e.target.value
              if(index != -1){
                setFilters({
                  ...filters,
                  'type': filters['type'].filter((x) => x !== temp)
                })
              }
              else{
                setFilters({
                  ...filters,
                  'type': [...filters['type'], e.target.value]
                })
              }
            }}/>
            <label> {type.name}</label>
          </div>
        })} 
        <div className='hr'></div>

        <p className='heading'>SELLERS</p>
        {sellers.map((seller) => {
          return <div className='brand-filter' key={seller.id}>
            <input type="checkbox" id="myCheckbox" value={seller.name} onChange={(e) => {
              let index = filters['seller'].indexOf(e.target.value)
              let temp = e.target.value
              if(index != -1){
                setFilters({
                  ...filters,
                  'seller': filters['seller'].filter((x) => x !== temp)
                })
              }
              else{
                setFilters({
                  ...filters,
                  'seller': [...filters['seller'], e.target.value]
                })
              }
            }}/>
            <label> {seller.name}</label>
          </div>
        })} 
        <div className='hr'></div>

        <p className='heading'>WARRENTY</p>
        {warranties.map((warranty) => {
          return <div className='brand-filter' key={warranty.id}>
            <input type="checkbox" id="myCheckbox" value={warranty.period} onChange={(e) => {
              let index = filters['warranty'].indexOf(e.target.value)
              let temp = e.target.value
              if(index != -1){
                setFilters({
                  ...filters,
                  'warranty': filters['warranty'].filter((x) => x !== temp)
                })
              }
              else{
                setFilters({
                  ...filters,
                  'warranty': [...filters['warranty'], e.target.value]
                })
              }
            }}/>
            <label> {warranty.period}</label>
          </div>
        })} 
        <div className='hr'></div>

      </div>
      <div className='product-container'>
        <div className='sort'>
          <h2>HEADPHONE HAS {products.length} PRODUCTS</h2>
          <select name="sort_by" onChange={(e) => setFilters({...filters, 'sort_by':e.target.value})}>
            <option disabled defaultValue=""> Sort: by price </option>
            <option value="low to high"> Sort: Low to high </option>
            <option value="high to low"> Sort: High to low </option>
          </select>
        </div>
        <div className='products'>
          <Products products={products}/>
        </div>
      </div>
    </div>
  )
}
export default Filter