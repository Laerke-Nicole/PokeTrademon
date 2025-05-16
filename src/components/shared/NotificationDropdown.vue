<template>
    <div class="relative" @mouseenter="show = true" @mouseleave="show = false">
      <button>
        <i class="fa-regular fa-bell text-lg"></i>
        <span v-if="unreadCount > 0" class="badge"></span>
      </button>
      <div v-if="show" class="dropdown">
        <div v-if="notifications.length === 0">No notifications</div>
        <ul v-else>
          <li v-for="note in notifications" :key="note._id" class="notification">
            <p>{{ note.message }}</p>
            <button @click="markAsRead(note._id)">Mark as read</button>
          </li>
        </ul>
        <button @click="markAllNotificationsAsRead">Mark all as read</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useNotifications } from "@/modules/globalStates/notifications";
  
  const show = ref(false);
  const {
    notifications,
    unreadCount,
    loadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotifications();
  
  onMounted(loadNotifications);
  
  const markAsRead = (id: string) => {
    markNotificationAsRead(id);
  };
  </script>
  
  <style scoped>
  .badge {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 8px;
    height: 8px;
    background: red;
    border-radius: 50%;
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    width: 12rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0.75rem;
    z-index: 50;
  }
  .notification {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: #374151;
  }
  .notification button {
    font-size: 0.75rem;
    margin-left: 0.5rem;
    color: #3b82f6;
    text-decoration: underline;
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  