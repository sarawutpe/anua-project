import httpClient from './httpClient'

// เพิ่มสินค้า
export const addProduct = async (formData) => {
  const { data } = await httpClient.post('/api/products', formData)
  return data
}

// ค้นหาสินค้าทั้งหมด
export const getProducts = async () => {
  const { data } = await httpClient.get('/api/products')
  return data
}

// ค้นหาสินค้าโดยระบุไอดี
export const getProductById = async (id) => {
  const { data } = await httpClient.get(`/api/products/${id}`)
  return data
}

// อับเดตสินค้าโดยใช้ไอดี
export const updateProductById = async (id, formData) => {
  const { data } = await httpClient.put(`/api/products/${id}`, formData)
  return data
}

// ลบสินค้าโดยใช้ไอดี
export const deleteProduct = async (id) => {
  const { data } = await httpClient.delete(`/api/products/${id}`)
  return data
}

// ค้าหาออร์เดอร์ทั้งหมด
export const getOrders = async () => {
  const { data } = await httpClient.get('/api/orders')
  return data
}

// เพิ่มออร์เดอร์
export const addOrder = async (formData) => {
  const { data } = await httpClient.post('/api/orders', formData)
  return data
}
