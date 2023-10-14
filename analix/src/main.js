import { createApp } from 'vue'
import router from '@/router'
import App from '@/App.vue'
import { createNotivue } from 'notivue' 
import '@/assets/css/main.css'
import "@fortawesome/fontawesome-free/js/brands"
import "@fortawesome/fontawesome-free/js/solid"
import "@fortawesome/fontawesome-free/js/fontawesome"
import 'notivue/notifications.css' 
import 'notivue/animations.css'
import * as ConfirmDialog from 'vuejs-confirm-dialog'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)
export const push = createNotivue(app, {
  position: 'top-right',
  limit: 4,
  enqueue: true,
  notifications: {
    global: {
      duration: 3000
    }
  }
})

app.use(router);
app.use(ConfirmDialog);
app.use(VueApexCharts);
app.mount('#app')
