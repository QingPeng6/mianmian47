import Vue from 'vue'
import App from './App.vue'

//导入vuex
import store from './store/vuex'
//导入路由 
import router from './router/index'

//导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入axios
import axios from 'axios';

//给vue的原型加一个axios,需要this.axios使用
Vue.prototype.$axios = axios;
//配置地址,组件的地址上不需要加全局地址 如:'http://183.237.67.218:3000'
axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'

//导入样式
import './style/base.css'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')