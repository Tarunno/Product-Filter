const BASE_URL = 'http://localhost:8000/api'

const getToken = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim()
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break
          }
      }
     return cookieValue
  }
}

export const getProducts = async (action, filters={}) => {
  if(action === 'all'){
    const res = await fetch(BASE_URL + '/products/')
    const data = await res.json()
    return data;
  }
  else if(action === 'filtered'){
    var csrftoken = getToken('csrftoken')
      
    const res = await fetch(BASE_URL + '/filtered_products/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(filters)
    })
    const data = await res.json()
    return data
  }
  return {'error': 'Invalid action'}
}

export const getAttrs = async (type, category='Earphone') => {
  const res = await fetch(BASE_URL + '/' + type + '/' + category + '/')
  const data = await res.json()
  return data;
}

export const getWarranty = async () => {
  const res = await fetch(BASE_URL + '/warranty/')
  const data = await res.json()
  return data;
}