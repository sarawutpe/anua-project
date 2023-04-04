import axios from 'axios'

// ปรับกาศตัวแปร axios ไว้เรียกใช้
const instance = axios.create()

// ฟังก์ชันสำหรับแก้ไขข้อมูลก่อนที่จะส่งไปยังหลังบ้าน
instance.interceptors.request.use(
  function (config) {
    // เพิ่ม path url ด้านหน้า api
    config.baseURL = import.meta.env.VITE_API_URL
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const httpClient = instance

export default httpClient
