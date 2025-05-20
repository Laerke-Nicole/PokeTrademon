<template>
  <div class="dropdown">
    <div v-if="notifications.length === 0">No notifications</div>
    <ul v-else>
      <li v-for="note in notifications" :key="note._id" class="notification">
        <p>{{ note.message }}</p>
        <button @click="markAsRead(note._id)">Mark as read</button>
      </li>
    </ul>
    <button @click="markAllNotificationsAsRead" class="font-semibold mt-2">Mark all as read</button>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import { useNotifications } from "@/modules/globalStates/notifications";

const {
  notifications,
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
.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 250px;
  background: white;
  border-radius: 12px;
  border: 1px solid var(--dark-headline);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  z-index: 50;
}

.notification {
  display: flex;
  justify-content: space-between;
  align-items: start;
  font-size: 0.875rem;
  color: var(--dark-text);
  padding: 0.5rem 0;
}

.notification p {
  margin: 0;
  flex: 1;
}

.notification button {
  font-size: 0.75rem;
  color: #3b82f6;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 0.5rem;
}

.dropdown > button {
  margin-top: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: black;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

</style>
