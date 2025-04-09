<template>
    <div v-if="card && card.length > 0" class="flex flex-wrap">
        <div class="w-1/2 p-4">
            <img :src="card[0].imageURL" alt="card image" class="w-full rounded-lg object-cover h-full" />
        </div>
        <div class="w-1/2 p-4">
            <h2>{{ card[0].name }}</h2>
            <p>{{ card[0].description }}</p>
            <p>$ {{ card[0].price }}</p>
        </div>
    </div>
    <div v-else>
        Loading card details...
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCards } from '../../modules/useCards';
import type { Card } from '../../interfaces/card';

const route = useRoute();
const card = ref<Card[] | null>(null);

const { fetchCardById } = useCards();

// when the html is being rendered, then collect the data
onMounted(async() => {
    const cardId = route.params.id as string;
    const fetchCard = await fetchCardById(cardId);
    console.log("Fetched card", fetchCard);
    card.value = fetchCard;
    console.log("Product: ", card.value);
})


</script>

<style>

</style>