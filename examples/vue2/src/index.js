import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import initRouter from './routes/index.js';

Vue.use(ElementUI);

initVue();

function initVue() {
  return new Vue({
    el: '#app',
    router: initRouter(Vue),
    render: h => h(App)
  });
}
