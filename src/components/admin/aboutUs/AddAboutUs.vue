<template>
  <!-- add about us -->
  <div>
    <h2 class="pb-4">Add about us</h2>
    <form @submit.prevent="addAboutUsHandler">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <span>Title: </span>
          <input
            type="text"
            v-model="newAboutUs.aboutUsTitle"
            placeholder="Title"
            minlength="2"
            maxlength="100"
            required
            class="white-bg round-corner p-1"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span>About us text: </span>
          <textarea
            type="text"
            v-model="newAboutUs.aboutUsText"
            placeholder="About us text"
            minlength="6"
            maxlength="255"
            required
            class="white-bg round-corner p-1"
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <span>Mission: </span>
          <textarea
            type="text"
            v-model="newAboutUs.mission"
            placeholder="Mission"
            minlength="2"
            maxlength="255"
            required
            class="white-bg round-corner p-1"
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <span>Vision: </span>
          <textarea
            type="text"
            v-model="newAboutUs.vision"
            placeholder="Vision"
            minlength="2"
            maxlength="255"
            required
            class="white-bg round-corner p-1"
          ></textarea>
        </div>
        <div class="flex flex-col gap-2">
          <span>Values sub title: </span>
          <textarea
            type="text"
            v-model="newAboutUs.valuesSubTitle"
            placeholder="Values sub title"
            minlength="2"
            maxlength="100"
            required
            class="white-bg round-corner p-1"
          ></textarea>
        </div>
        <div class="flex flex-col gap-2">
          <span>Value one title: </span>
          <input
            type="text"
            v-model="newAboutUs.valueOneTitle"
            placeholder="Value one title"
            minlength="2"
            maxlength="100"
            required
            class="white-bg round-corner p-1"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span>Value one: </span>
          <textarea
            type="text"
            v-model="newAboutUs.valueOne"
            placeholder="Value one"
            minlength="2"
            maxlength="255"
            required
            class="white-bg round-corner p-1"
          ></textarea>
        </div>
        <div class="flex flex-col gap-2">
          <span>Value two title: </span>
          <input
            type="text"
            v-model="newAboutUs.valueTwoTitle"
            placeholder="Value two title"
            minlength="2"
            maxlength="100"
            required
            class="white-bg round-corner p-1"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span>Value two: </span>
          <textarea
            type="text"
            v-model="newAboutUs.valueTwo"
            placeholder="Value two"
            minlength="2"
            maxlength="255"
            required
            class="white-bg round-corner p-1"
          ></textarea>
        </div>
        <div class="flex flex-col gap-2">
          <span>Value three title: </span>
          <input
            type="text"
            v-model="newAboutUs.valueThreeTitle"
            placeholder="Value three title"
            minlength="2"
            maxlength="100"
            required
            class="white-bg round-corner p-1"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span>Value three: </span>
          <textarea
            type="text"
            v-model="newAboutUs.valueThree"
            placeholder="Value three"
            minlength="2"
            maxlength="255"
            required
            class="white-bg round-corner p-1"
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <span>About us image: </span>
          <input
            type="text"
            v-model="newAboutUs.imageURL"
            placeholder="Image URL"
            required
            class="white-bg round-corner p-1"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span>Opening hours: </span>
          <input 
            type="text" 
            v-model="newAboutUs.openingHours" 
            placeholder="Opening hours" 
            minlength="2" 
            maxlength="100" 
            required 
            class="white-bg round-corner p-1"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span>Phone number: </span>
          <input 
            type="text" 
            v-model="newAboutUs.phoneNumber" 
            placeholder="Phone number" 
            minlength="2" 
            maxlength="100" 
            required 
            class="white-bg round-corner p-1"
          />
        </div>

        <div class="flex flex-col gap-2">
          <span>Email: </span>
          <input 
            type="text" 
            v-model="newAboutUs.email" 
            placeholder="email" 
            minlength="2" 
            maxlength="100" 
            required 
            class="white-bg round-corner p-1"
          />
        </div>
      </div>

      <div class="pt-4">
        <div v-if="message" class="text-green-600 pb-4">
          {{ message }}
        </div>
        <button type="submit" class="btn-1">Create news</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAboutUs } from '../../../modules/useAboutUs'

// AboutUs fetching
const { fetchAboutUs, addAboutUs, getTokenAndUserId } = useAboutUs()

onMounted(() => {
  fetchAboutUs()
})

// create new AboutUs
const newAboutUs = ref({
  aboutUsTitle: '',
  aboutUsText: '',
  mission: '',
  vision: '',
  valuesSubTitle: '',
  valueOneTitle: '',
  valueOne: '',
  valueTwoTitle: '',
  valueTwo: '',
  valueThreeTitle: '',
  valueThree: '',
  imageURL: '',
  openingHours: '',
  phoneNumber: '',
  email: '',
  userId: '',
})

const message = ref('')

// handling adding new AboutUs
const addAboutUsHandler = async () => {
  const { userId } = getTokenAndUserId()

  // attach to new AboutUs
  newAboutUs.value.userId = userId
  try {
    await addAboutUs(newAboutUs.value)
    message.value = 'AboutUs added successfully'

    // reset the form
    newAboutUs.value = {
      aboutUsTitle: '',
      aboutUsText: '',
      mission: '',
      vision: '',
      valuesSubTitle: '',
      valueOneTitle: '',
      valueOne: '',
      valueTwoTitle: '',
      valueTwo: '',
      valueThreeTitle: '',
      valueThree: '',
      imageURL: '',
      openingHours: '',
      phoneNumber: '',
      email: '',
      userId: '',
    }

    // remove message after 5 seconds
    setTimeout(() => {
      message.value = ''
    }, 5000)
  } catch (error) {
    console.error('Error adding AboutUs:', error)
    throw new Error('Error adding AboutUs')
  }
}
</script>

<style scoped></style>
