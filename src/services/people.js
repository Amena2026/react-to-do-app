// the functions responsible for communicating with the backend server are defined in the people.js file
import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

// make a get request to the specified url and then return the data
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// make a post request to the specified url with the newly created person object
// return the response
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create
}