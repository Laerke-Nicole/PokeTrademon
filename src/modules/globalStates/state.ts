import { reactive, watch } from 'vue'

// make sure the nav links are always visible if user is logged in even when they reload the page
// make isLoggedIn default to false
const isLoggedInFromStorage = localStorage.getItem('isLoggedIn') === 'true'
const userRoleFromStorage = localStorage.getItem('userRole') || 'user'

export const state = reactive({
  isLoggedIn: isLoggedInFromStorage,
  userRole: userRoleFromStorage,
})

// watch for changes and update local storage
watch(
  () => state.isLoggedIn,
  (newValue) => {
    localStorage.setItem('isLoggedIn', String(newValue))
  },
)

// watch for changes on userrole
watch(
  () => state.userRole,
  (newValue) => {
    localStorage.setItem('userRole', newValue)
  },
)
