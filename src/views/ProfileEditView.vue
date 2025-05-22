<template>
  <section class="dark-bg min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 mt-28">
      <h2 class="text-2xl font-bold text-center text-gray-800">Edit Your Profile</h2>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <div class="pb-4">
          <label class="block text-sm font-medium text-gray-700 pb-1">Username</label>
          <input
            v-model="form.username"
            type="text"
            class="w-full p-2 border rounded-md shadow-sm text-gray-400"
          />
        </div>

        <div calss="pb-4">
          <label class="block text-sm font-medium text-gray-700 pb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full p-2 border rounded-md shadow-sm text-gray-400"
          />
        </div>

        <div class="pt-4 pb-4">
          <label class="block text-sm font-medium text-gray-700 pb-1">New Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full p-2 border rounded-md shadow-sm"
            placeholder="Leave blank to keep current"
          />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>
      </form>

      <div class="text-center pt-4">
        <button @click="deleteAccount" class="text-sm text-red-600 hover:underline">
          Delete Account
        </button>
      </div>

      <div v-if="message" class="text-center text-green-600">
        {{ message }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView'
import { useRouter } from 'vue-router'
import { useUsers } from '../modules/auth/userModels'
import { updateUser, deleteUser } from '../modules/auth/userAPI'

const router = useRouter()
const { user, logout, loadUser } = useUsers()

const form = ref({
  username: '',
  email: '',
  password: '',
})

const message = ref('')

onMounted(async () => {
  await loadUser() // fetch from API and populate user.value

  if (user.value) {
    form.value.username = user.value.username
    form.value.email = user.value.email
  }
})

const updateProfile = async () => {
  try {
    const payload = {
      username: form.value.username?.trim() || '',
      email: form.value.email?.trim() || '',
      password: form.value.password?.trim() || undefined,
    }

    if (!payload.username || !payload.email) {
      message.value = 'Username and email are required'
      return
    }

    await updateUser(payload)
    message.value = 'Profile updated successfully!'
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (err) {
    console.error(err)
    message.value = 'Failed to update profile.'
  }
}

const deleteAccount = async () => {
  const confirmed = confirm('Are you sure you want to delete your account? This cannot be undone.')
  if (!confirmed) return

  try {
    await deleteUser()
    logout()
    router.push('/auth')
  } catch (err) {
    console.error(err)
    message.value = 'Failed to delete account.'
  }
}

// start at the top of the page
onMounted(() => {
  scrollToTop()
})
</script>

<style scoped></style>
