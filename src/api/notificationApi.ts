import axios from 'axios'
import { getAuthToken } from '../modules/auth/userModels'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004/api'

const config = () => ({
  headers: { 'auth-token': getAuthToken() },
})

export const fetchNotifications = async () => {
  const res = await axios.get(`${BASE_URL}/notifications`, config())
  return res.data
}

export const getUnreadCount = async () => {
  const res = await axios.get(`${BASE_URL}/notifications/unread-count`, config())
  return res.data.unreadCount
}

export const markAsRead = async (id: string) => {
  await axios.patch(`${BASE_URL}/notifications/${id}/read`, {}, config())
}

export const markAllAsRead = async () => {
  const res = await axios.patch(`${BASE_URL}/notifications/mark-all-read`, {}, config())
  return res.data
}
