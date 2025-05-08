<template>
    <section class="grid grid-cols-3 gap-4 pt-30 pb-18 three-percent about-container justify-end items-end">
        <div>
            <h1>About PokeTrademon</h1>
        </div>

        <div>
            <img src="../../public/images/charizard.png" alt="">
        </div>

        <div>
            <h3 class="pb-4">We make Pokemon trading simple for you</h3>
            <button class="btn-1">Start trading</button>
        </div>
    </section>


    <section class="dark-bg five-percent pt-18">
        <div class="pb-10 grid grid-cols-2">
            <div></div>
            <div>
                <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium repellat vero molestias ipsa enim, nostrum illum quam impedit dignissimos aperiam. A quidem eius eos delectus doloribus modi quisquam dolorum nulla.</h4>
            </div>
        </div>

        <div class="row">
            <div class="column">
                <img src="https://picsum.photos/500/500?random" class="round-corner">
            </div>
            <div class="column">
                <img src="https://picsum.photos/500/600?random" class="round-corner">
            </div>
            <div class="column">
                <img src="https://picsum.photos/500/300?random" class="round-corner">
                <img src="https://picsum.photos/500/600?random" class="round-corner">
            </div>
            </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
.about-container {
    height: 95vh;
}


/* image grid */
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
}

/* Create two equal columns that sits next to each other */
.column {
  flex: 33.33%;
  padding: 0 10px;
}

.column img {
  margin-top: 20px;
  vertical-align: middle;
}
</style>