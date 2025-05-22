import { ref } from 'vue'
import type { Notification } from '@/interfaces/notification'
import {
  fetchNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from '../../api/notificationApi'
import type { ComponentPublicInstance } from 'vue'

type ToastComponent = ComponentPublicInstance<{ showToast: (msg: string) => void }>

const notifications = ref<Notification[]>([])
const unreadCount = ref<number>(0)
const previousIds = ref<string[]>([])

const playNotificationSound = (sound = 'notification1') => {
  const audio = new Audio(`/sound/${sound}.wav`)
  audio.volume = 0.5
  audio.play().catch((err) => {
    console.warn('Unable to play notification sound:', err)
  })
}

let toastRef: ToastComponent | null = null
export const setToastRef = (ref: ToastComponent) => {
  toastRef = ref
}

export const useNotifications = () => {
  const loadNotifications = async () => {
    const newNotifications = await fetchNotifications()
    const currentIds = newNotifications.map((n: Notification) => n._id)
    const newOnes = newNotifications.filter((n: Notification) => !previousIds.value.includes(n._id))

    if (newOnes.length > 0) {
      playNotificationSound()
      toastRef?.showToast(`🔔 You have ${newOnes.length} new notification(s)!`)
    }

    previousIds.value = currentIds
    notifications.value = newNotifications
    unreadCount.value = await getUnreadCount()
  }

  const markNotificationAsRead = async (id: string) => {
    await markAsRead(id)
    await loadNotifications()
  }

  const markAllNotificationsAsRead = async () => {
    await markAllAsRead()
    await loadNotifications()
  }

  return {
    notifications,
    unreadCount,
    loadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }
}
