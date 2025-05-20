<template>
  <!-- the list of about us with just img, title and text -->
    <div>
      <h2 class="pb-4">List of about us</h2>
      <div v-for="aboutUsItem in aboutUs" :key="aboutUsItem._id" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4 light-bg round-corner shadow-lg p-4">
          <div class="flex flex-col gap-2">
            <h4>{{ aboutUsItem.aboutUsTitle.trim() }}</h4>
            <p>{{ aboutUsItem.aboutUsText.trim() }}</p>
          </div>

          <div class="pb-4">
            <img alt="About us Image" :src="aboutUsItem.imageURL" class="shadow-lg aboutUs-thumbnail">
          </div>
          
          <!-- open modal -->
          <button @click="openModal(aboutUsItem)" class="btn-1">Click to edit about us</button>

          <!-- delete AboutUs -->
          <button @click="deleteAboutUs(aboutUsItem._id)" class="delete-btn bg-red-600 light-headline p-2 hover:bg-red-700 cursor-pointer">Delete</button>
          
          <!-- display success message -->
          <div v-if="message" class="text-green-600 pt-4 pb-4">
            {{ message }}
          </div>
        </div>

        <!-- AboutUs modal component -->
        <AboutUsModal v-model:isVisible="isAboutUsVisible" :AboutUsItem="selectedaboutUsItem" @updateAboutUs="updateAboutUsHandler" @deleteAboutUs="deleteAboutUs" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAboutUs } from '../../../modules/useAboutUs';
import type { AboutUs } from '../../../interfaces/aboutUs';
import AboutUsModal from '../modals/AboutUsModal.vue';


// AboutUs fetching
const { aboutUs, fetchAboutUs, deleteAboutUs, updateAboutUs } = useAboutUs();

// for modal to show
const isAboutUsVisible = ref(false);
const selectedaboutUsItem = ref<AboutUs | null>(null);


// open modal with specific AboutUs item
const openModal = (aboutUsItem: AboutUs) => {
  selectedaboutUsItem.value = { ...aboutUsItem }; 
  isAboutUsVisible.value = true;
};

// message to show after updating
const message = ref('');

// handling updating AboutUs
const updateAboutUsHandler = async (aboutUs: AboutUs) => {
  try {
    // take the data from the input fields
    const updatedAboutUs = {
      aboutUsTitle: aboutUs.aboutUsTitle,
      aboutUsText: aboutUs.aboutUsText,
      mission: aboutUs.mission,
      vision: aboutUs.vision,
      valuesSubTitle: aboutUs.valuesSubTitle,
      valueOneTitle: aboutUs.valueOneTitle,
      valueOne: aboutUs.valueOne,
      valueTwoTitle: aboutUs.valueTwoTitle,
      valueTwo: aboutUs.valueTwo,
      valueThreeTitle: aboutUs.valueThreeTitle,
      valueThree: aboutUs.valueThree,
      imageURL: aboutUs.imageURL,
    }
    // call the updateAboutUs function from useAboutUs
    await updateAboutUs(aboutUs._id, updatedAboutUs)
    message.value = 'AboutUs updated successfully';
    isAboutUsVisible.value = false;
    fetchAboutUs();

    // remove message after 5 seconds
    setTimeout(() => {
      message.value = '';
    }, 5000);
  }
  catch (error) {
    throw new Error('Error updating AboutUs');
  }
}


onMounted(() => {
  fetchAboutUs();
});

</script>

<style scoped>
.AboutUs-thumbnail {
  width: auto;
  height: 150px;
  object-fit: cover;
}

.delete-btn {
  border-radius: 20px;
}
</style>