import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import initRouter from './routes/index.js';

const router = initRouter();

const app = createApp(App);

app.use(router)
  .use(ElementPlus)
  .mount('#app');
