<template>
    <!-- add about us -->
    <div>
        <h2 class="pb-4">Add about us</h2>
        <form @submit.prevent="addAboutUsHandler">                                                              
        <div class="flex flex-col gap-4">

            <div class="flex flex-col gap-2">
              <span>Title: </span>
              <input type="text" v-model="newAboutUs.aboutUsTitle" placeholder="Title" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>About us text: </span>
              <input type="text" v-model="newAboutUs.aboutUsText" placeholder="Sub title" class="white-bg round-corner p-1" /> 
            </div>
            
            <div class="flex flex-col gap-2">
              <span>Mission: </span>
              <input type="text" v-model="newAboutUs.mission" placeholder="Mission" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>Vision: </span>
              <input type="text" v-model="newAboutUs.vision" placeholder="Vision" class="white-bg round-corner p-1" />
            </div>
            <div class="flex flex-col gap-2">
              <span>Values sub title: </span>
              <input type="text" v-model="newAboutUs.valuesSubTitle" placeholder="Values sub title" class="white-bg round-corner p-1" />
            </div>
            <div class="flex flex-col gap-2">
              <span>Value one title: </span>
              <input type="text" v-model="newAboutUs.valueOneTitle" placeholder="Value one title" class="white-bg round-corner p-1" />
            </div>
            <div class="flex flex-col gap-2">
              <span>Value one: </span>
              <input type="text" v-model="newAboutUs.valueOne" placeholder="Value one" class="white-bg round-corner p-1" />
            </div>
            <div class="flex flex-col gap-2">
              <span>Value two title: </span>
              <input type="text" v-model="newAboutUs.valueTwoTitle" placeholder="Value two title" class="white-bg round-corner p-1" />
            </div>
            <div class="flex flex-col gap-2">
              <span>Value two: </span>
              <input type="text" v-model="newAboutUs.valueTwo" placeholder="Value two" class="white-bg round-corner p-1" />
            </div>
            <div class="flex flex-col gap-2">
              <span>Value three title: </span>
              <input type="text" v-model="newAboutUs.valueThreeTitle" placeholder="Value three title" class="white-bg round-corner p-1" />
            </div>
            <div class="flex flex-col gap-2">
              <span>Value three: </span>
              <input type="text" v-model="newAboutUs.valueThree" placeholder="Value three" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>About us image: </span>
              <input type="text" v-model="newAboutUs.imageURL" placeholder="Image URL" class="white-bg round-corner p-1" />
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
import { onMounted, ref } from 'vue';
import { useAboutUs } from '../../modules/useAboutUs';



// AboutUs fetching
const { aboutUs, fetchAboutUs, addAboutUs, getTokenAndUserId } = useAboutUs();

onMounted(() => {
  fetchAboutUs();
});


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
    userId: '',
});

const message = ref('');

// handling adding new AboutUs
const addAboutUsHandler = async () => {
  // import userId from the useAboutUs
  const { userId } = getTokenAndUserId();

  // attach to new AboutUs
  newAboutUs.value.userId = userId;
  try {
    await addAboutUs(newAboutUs.value)
    message.value = 'AboutUs added successfully';
  
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
        userId: '',
    }

    // remove message after 5 seconds
    setTimeout(() => {
      message.value = '';
    }, 5000);
  } 
  catch (error) {
    throw new Error('Error adding news');
  }
}
</script>

<style scoped>

</style>