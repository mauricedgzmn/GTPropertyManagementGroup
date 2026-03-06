import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gtmg_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getImageUrl = (img) => {
  if (!img) return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80'
  if (img.startsWith('http')) return img
  const base = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  return `${base}${img}`
}

export default api