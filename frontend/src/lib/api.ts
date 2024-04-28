import ky from 'ky'

export const api = ky.create({prefixUrl: import.meta.env.VITE_BACKEND_URL})

export const getFeed = () => api.get('posts', { credentials: "include" }).json()
export const getUserData = (id) => api.get(`users/${id}`, { credentials: "include" }).json()