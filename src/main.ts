import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// custom animation
app.use(MotionPlugin, {
    directives: {
      'fade-slide': {
        initial: {
          opacity: 0,
          y: 100,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 500,
            type: 'keyframes',
            ease: 'linear',
          },
        },
      },
    },
  })

app.mount('#app')
