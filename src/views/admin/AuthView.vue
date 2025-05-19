<template>
  <section class="dark-bg pt-16">
    <div class="flex items-center justify-center">
      <div class="pt-24 flex flex-col gap-4 max-w-md mx-auto">
        <h3 class="text-xl font-semibold dark-headline text-center">Login to your account</h3>
    
        <!-- input fields -->
        <input type="text" class="light-bg p-2 round-corner dark-text" placeholder="Email" v-model="email"/>
        <input type="password" class="light-bg p-2 round-corner dark-text" placeholder="Password" v-model="password"/>
    
        <!-- login btn -->
        <button class="btn-1" @click="handleLogin">Login</button>

        <!-- router to register page -->
        <p class="dark-text text-sm pt-2">Don't have an account? <RouterLink to="/register"><span class="sign-up underline">Sign up now</span></RouterLink></p>
    
        <!-- handle msg whether user got signed in or not -->
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

        <!-- after logging in -->
        <div v-if="isLoggedIn">
          <div>
            <p class="text-green-500 text-sm mt-2">Login successful</p>

            <div>
              <div v-if="state.isLoggedIn && isUser">
                <button class="btn-1 mt-2">
                  <RouterLink to="/collection">
                    Go to your profile
                  </RouterLink>
                </button>
              </div>

              <div v-if="state.isLoggedIn && isAdmin">
                <button class="btn-1 mt-2">
                  <RouterLink to="/admin">
                    Go to admin page
                  </RouterLink>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  </section>
</template>
  
<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { state } from '../../modules/globalStates/state';
import { useUsers } from '../../modules/auth/userModels';
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';


// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});

const { user, loadUser } = useUsers();

onMounted(async () => {
  if (state.isLoggedIn) {
    await loadUser()
  } 
})


// for input fields to fetch
const { fetchToken, email, password, error, isLoggedIn } = useUsers();

// logs user in
const handleLogin = async () => {
  await fetchToken(email.value, password.value);
};

// checking if userrole is admin
const isUser = computed(() => user.value?.userRole === 'user')
const isAdmin = computed(() => user.value?.userRole === 'admin')



</script>

<style scoped>
/* sign up btn */
.sign-up {
  transition: 0.3s;
}

.sign-up:hover {
  color: var(--dark-headline)
}
</style>
