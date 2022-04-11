import axios from 'axios';

// run with JSON-server 
const baseUrl = 'http://localhost:3001/persons';

// run with part3.backend custom node server 
// const baseUrl = 'http://localhost:3001/api/persons';

// run with part3.backend custom node server on heroku externally
//const baseUrl = 'https://secure-sea-91471.herokuapp.com/api/persons'

// run with part3.backend custom node server on same server - local or heroku 
//const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteMe = (id) => {
  const request = axios.delete( `${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteMe };