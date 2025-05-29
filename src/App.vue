<template>
  <!-- navigation -->
  <header class="fixed top-6 left-0 right-0 z-50">
    <nav class="w-full">
      <div
        class="max-w-screen-xl mx-auto bg-white rounded-full px-8 py-3 flex items-center justify-between shadow-lg"
      >
        <div class="flex items-center space-x-8">
          <RouterLink to="/">
            <div class="pokemon-logo">
              <img src="../public/images/pokemon-logo.png" alt="Pokemon Logo" class="h-10" />
            </div>
          </RouterLink>
          <div class="nav-links flex items-center space-x-6 pl-6">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/news">News</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink v-if="readyToShowLinks && isUser" to="/market">Market</RouterLink>
            <RouterLink v-if="readyToShowLinks && isUser" to="/collection"
              >My Collection</RouterLink
            >
            <RouterLink v-if="readyToShowLinks && isUser" to="/trades">Trade</RouterLink>
            <!-- only admins can accesss -->
            <RouterLink v-if="isAdmin" to="/admin">Admin</RouterLink>
          </div>
        </div>

        <!-- icons -->
        <div class="flex space-x-8">
          <!-- user icon -->
          <div
            class="user-icon relative flex space-x-1"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
            <RouterLink to="/collection">
              <i class="far fa-user text-lg cursor-pointer"></i>
            </RouterLink>
            <div v-if="isHovered" class="absolute top-full right-0 z-50">
              <div class="w-40">
                <UserDropdown />
              </div>
            </div>
          </div>

          <!-- notification bell icon -->
          <div v-if="readyToShowLinks && isUser" class="relative group">
            <!-- Bell with badge -->
            <div class="relative z-10 p-2 hover:bg-gray-100 rounded-full">
              <i class="fa-regular fa-bell text-lg block"></i>
              <span v-if="unreadCount > 0" class="badge"></span>
            </div>

            <!-- Dropdown -->
            <div
              class="absolute top-full right-0 mt-2 w-56 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            >
              <NotificationDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />

  <div class="bg-white">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#3043CA"
        fill-opacity="1"
        d="M0,160L34.3,144C68.6,128,137,96,206,106.7C274.3,117,343,171,411,197.3C480,224,549,224,617,197.3C685.7,171,754,117,823,128C891.4,139,960,213,1029,224C1097.1,235,1166,181,1234,181.3C1302.9,181,1371,235,1406,261.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
      ></path>
    </svg>
  </div>

  <!-- footer -->
  <footer class="flex justify-around five-percent pb-12 bg-white">
    <div>
      <h3 class="dark-headline pb-2">PokeTrademon</h3>
      <p class="dark-text">Kongensgade 29, 6700 Esbjerg</p>
      <p class="dark-text">+45 23 27 21 09</p>
      <p class="dark-text">Support@Poketrademon.com</p>
    </div>

    <div class="flex flex-col gap-2 footer-links">
      <RouterLink v-if="readyToShowLinks && isUser" to="/market"
        ><p class="dark-text">Market</p></RouterLink
      >
      <RouterLink to="/about"><p class="dark-text">About PokeTrademon</p></RouterLink>
      <RouterLink to="/news"><p class="dark-text">News</p></RouterLink>
      <RouterLink to="/contact"><p class="dark-text">Contact us</p></RouterLink>
      <RouterLink to="/guide"><p class="dark-text">Guide to start</p></RouterLink>
      <p class="dark-text">Careers</p>
    </div>

    <div class="flex flex-col gap-2 footer-links">
      <p class="dark-text">Cookie policy</p>
      <p class="dark-text">Privacy policy</p>
      <p class="dark-text">Cookie settings</p>
      <p class="dark-text">Security</p>
      <p class="dark-text">Copyright PokeTrademon 2025</p>
    </div>
  </footer>
  <Toast ref="toastRef" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { state } from './modules/globalStates/state'
import { useUsers } from './modules/auth/userModels'
import UserDropdown from './components/user/UserDropdownView.vue'
import NotificationDropdown from './components/shared/NotificationDropdown.vue'
import Toast from './components/shared/ToastView.vue'
import { setToastRef } from './modules/globalStates/notifications'
import { useNotifications } from './modules/globalStates/notifications'

const { unreadCount } = useNotifications()

const isHovered = ref(false)
const toastRef = ref()

onMounted(() => {
  setToastRef(toastRef.value)
})


const { user, loadUser } = useUsers()

onMounted(async () => {
  if (state.isLoggedIn) {
    await loadUser()
  }
})

// checking if user is admin or just user
const isUser = computed(() => user.value?.userRole === 'user' || state.userRole === 'user')
const isAdmin = computed(() => user.value?.userRole === 'admin' || state.userRole === 'admin')

const readyToShowLinks = computed(() => state.isLoggedIn && (user.value || state.userRole))
</script>

<style scoped>
header {
  padding: 0 24px;
}

nav {
  font-size: 15px;
  width: 100%;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  text-decoration: underline;
  color: red;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: var(--dark-text);
}

.user-icon,
.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  position: relative;
}

.user-icon i,
.notification-icon i {
  font-size: 1.25rem;
  color: var(--dark-headline);
  line-height: 1;
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  box-shadow: 0 0 0 2px white;
  z-index: 20;
}

/* footer */
.footer-links p {
  transition: 0.3s;
}

.footer-links p:hover {
  color: var(--dark-text);
  text-decoration: underline;
  cursor: pointer;
}

/* responsive design */
@media screen and (max-width: 800px) {
  footer {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
