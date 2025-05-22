import { onMounted } from 'vue'
import { useNotifications } from '@/modules/globalStates/notifications'

export function useDropdownNotifications() {
  const { notifications, loadNotifications, markNotificationAsRead, markAllNotificationsAsRead } =
    useNotifications()

  // Load notifications only when dropdown mounts
  onMounted(() => {
    loadNotifications()
  })

  return {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }
}
