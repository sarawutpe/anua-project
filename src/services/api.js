import httpClient from './httpClient'

export const addProduct = async (formData) => {
  const { data } = await httpClient.post('/api/products', formData)
  return data
}

export const getProducts = async () => {
  const { data } = await httpClient.get('/api/products')
  return data
}

export const getProductById = async (id) => {
  const { data } = await httpClient.get(`/api/products/${id}`)
  return data
}

export const updateProductById = async (id, formData) => {
  const { data } = await httpClient.put(`/api/products/${id}`, formData)
  return data
}

export const deleteProduct = async (id) => {
  const { data } = await httpClient.delete(`/api/products/${id}`)
  return data
}

export const getOrders = async () => {
  const { data } = await httpClient.get('/api/orders')
  return data
}

export const addOrder = async (formData) => {
  const { data } = await httpClient.post('/api/orders', formData)
  return data
}
