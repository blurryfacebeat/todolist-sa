import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './routes';
import store from './store/index';

Vue.use(VueRouter);

export const eventEmitter = new Vue();

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});