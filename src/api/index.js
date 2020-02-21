import Vue from 'vue'
//axios全局配置
//导入axios
import axios from 'axios';
//给vue的原型加一个axios,需要this.axios使用
Vue.prototype.$axios = axios;
//配置地址,组件的地址上不需要加全局地址 如:'http://183.237.67.218:3000'
axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'