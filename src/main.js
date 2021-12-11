import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/styles.scss'
import router from './router'

// Extract the function out, up here, so I'm not writing it twice
const update = ({ style }, binding) => {
  style.visibility = (binding.value) ? "hidden" : ""
}

createApp(App).use(router)
  .directive("hide", { beforeMount: update, updated: update })
  .mount('#app')


