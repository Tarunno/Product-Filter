import {useEffect, useState} from 'react'
import { getProducts } from './api/productApi'
import Header from './components/Header'  
import Filter from './components/Filter'
import './App.scss'

const App = () => {

  const [products, setProdcuts]= useState([])
  const [filters, setFilters] = useState({
    'sort_by': null,
    'brand': [],
    'type': [],
    'seller': [],
    'warranty': [],
    'starting_price': null,
    'ending_price': null
  })

  const loadAll = async () => {
    const data = await getProducts('all') 
    setProdcuts(data)
  }

  const loadFiltered = async () => {
    const data = await getProducts('filtered', filters)
    setProdcuts(data)
  }

  useEffect(() => {
    loadFiltered()
  }, [filters])

  useEffect(() => {
    document.title = "Qtec problem3"
    loadAll()
  }, [])

  return (
    <div className='App'>
      <Header/>
      <div className='content'>
        <Filter filters={filters} setFilters={setFilters} products={products}/>
      </div>
    </div>
  );
}

export default App;
