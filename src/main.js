import Vue from 'vue'
import App from './App.vue'

//导入路由 
import router from './router/index'

//导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//导入样式
import './style/base.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')