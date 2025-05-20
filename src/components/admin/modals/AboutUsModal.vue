<template>
    <div>
      <!-- show the modal -->
      <!-- click on the toggle and the modal dissapears -->
        <div v-if="isVisible" @click.self="toggleAboutUs" class="pt-30 pb-10 modal-exit fixed inset-0 flex items-center justify-center">
            <div @click.stop class="modal light-bg h-full p-4 overflow-y-auto" > 
            <div>
                <!-- top section with title and close btn -->
                <div class="flex justify-between items-center pb-6">
                    <div>
                        <h2>Edit AboutUs</h2>
                    </div>

                    <!-- cloe X btn -->
                    <div class="flex justify-end items-end">
                        <button @click="toggleAboutUs" class="text-4xl text-red-400 hover:text-red-700">&times;</button>
                    </div>
    
                </div>
                
                <!-- list of the AboutUs info -->
                <div v-if="aboutUsItem">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-2">
                          <span>Title: </span>
                          <input type="text" v-model="aboutUsItem.aboutUsTitle" placeholder="Title" minlength="2" maxlength="100" required class="white-bg round-corner p-1" />
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>About us text: </span>
                          <textarea type="text" v-model="aboutUsItem.aboutUsText" placeholder="Sub title" minlength="6" maxlength="255" required class="white-bg round-corner p-1"></textarea> 
                        </div>
                        
                        <div class="flex flex-col gap-2">
                          <span>Mission: </span>
                          <textarea type="text" v-model="aboutUsItem.mission" placeholder="Mission" minlength="2" maxlength="255" required class="white-bg round-corner p-1"></textarea>
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>Vision: </span>
                          <textarea type="text" v-model="aboutUsItem.vision" placeholder="Vision" minlength="2" maxlength="255" required class="white-bg round-corner p-1"></textarea>
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>Values sub title: </span>
                          <textarea type="text" v-model="aboutUsItem.valuesSubTitle" placeholder="Values sub title" minlength="2" maxlength="100" required class="white-bg round-corner p-1"></textarea>
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>Value one title: </span>
                          <input type="text" v-model="aboutUsItem.valueOneTitle" placeholder="Value one title" minlength="2" maxlength="100" required class="white-bg round-corner p-1" />
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>Value one: </span>
                          <textarea type="text" v-model="aboutUsItem.valueOne" placeholder="Value one" minlength="2" maxlength="255" required class="white-bg round-corner p-1"></textarea>
                        </div>
                        
                        <div class="flex flex-col gap-2">
                          <span>Value two title: </span>
                          <input type="text" v-model="aboutUsItem.valueTwoTitle" placeholder="Value two title" minlength="2" maxlength="100" required class="white-bg round-corner p-1" />
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>Value two: </span>
                          <textarea type="text" v-model="aboutUsItem.valueTwo" placeholder="Value two" minlength="2" maxlength="255" required class="white-bg round-corner p-1"></textarea>
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>Value three title: </span>
                          <input type="text" v-model="aboutUsItem.valueThreeTitle" placeholder="Value three title" minlength="2" maxlength="100" required class="white-bg round-corner p-1" />
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>Value three: </span>
                          <textarea type="text" v-model="aboutUsItem.valueThree" placeholder="Value three" minlength="2" maxlength="255" required class="white-bg round-corner p-1"></textarea>
                        </div>

                        <div class="flex flex-col gap-2">
                          <span>About us image: </span>
                          <input type="text" v-model="aboutUsItem.imageURL" placeholder="Image URL" required class="white-bg round-corner p-1" />
                        </div>
                    </div>
          
                    <!-- delete and update btns -->
                    <div class="pt-6 flex flex-col gap-2"> 
                      <p>ID: {{ aboutUsItem._id.trim() }} </p> 
                      <button @click="updateAboutUsHandler" class="edit-btn bg-green-600 light-headline p-2  hover:bg-green-700 cursor-pointer">Edit</button>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAboutUs } from '../../../modules/useAboutUs';
import type { AboutUs } from '../../../interfaces/aboutUs';


// props
const props = defineProps<{ AboutUsItem: AboutUs | null }>()
const aboutUsItem = ref<AboutUs | null>(null)

// watch for changes in the AboutUsItem prop
watch(
  () => props.AboutUsItem,
  (newVal) => {
    aboutUsItem.value = newVal ? { ...newVal } : null
  },
  { immediate: true }
)

// toggle cart visibility
const isVisible = defineModel<boolean>('isVisible')

// close modal
const toggleAboutUs = ():void => {
  isVisible.value = !isVisible.value
}

// AboutUs fetching
const { aboutUs, fetchAboutUs, deleteAboutUs, updateAboutUs } = useAboutUs();

onMounted(() => {
  fetchAboutUs();
});


const message = ref('');

// handling updating news
const emit = defineEmits(['updateAboutUs']);

const updateAboutUsHandler = () => {
  if (aboutUsItem.value) {
    emit('updateAboutUs', aboutUsItem.value);
  }
};
</script>

<style scoped>
/* add background behind the modal */
.modal-exit {
  background-color: rgba(91, 91, 91, 0.5);
}

.modal {
    width: 70%;
}

/* news info */
.aboutUs-thumbnail {
  width: auto;
  height: 150px;
  object-fit: cover;
}

.edit-btn {
  border-radius: 20px;
}
</style>