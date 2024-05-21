import axios from 'axios';

// Debido a nuestra situación, tanto el frontend como el backend están en la misma dirección, podemos declarar baseUrl como una URL relativa . Esto significa que podemos omitir la parte que declara el servidor.
const baseUrl = '/api/people'
                

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)
}

const eliminate = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, changedObject) => {
    const request = axios.put(`${baseUrl}/${id}`,changedObject)
    return request.then(response => response.data)
}

export default {getAll, create, eliminate, update}