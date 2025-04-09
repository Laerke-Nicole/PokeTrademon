import { onMounted } from "vue";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

export function useSwiper() {
  onMounted(() => {
    new Swiper(".swiper", {
      modules: [EffectCoverflow, Pagination, Navigation],
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 3,
      loop: true,
      speed: 600,
      coverflowEffect: {
        rotate: 0,
        stretch: 60,
        depth: 250,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  });
}