import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'

const app = createApp(App);
app.config.warnHandler = (msg, instance, trace) => {};
app.use(store).use(router).mount('#app')
