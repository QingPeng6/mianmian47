import axios from 'axios';


import {
    getToken
} from './token' //*导入获取token方法

//克隆axios
let requestQ = axios.create({
    baseURL: process.env.VUE_APP_URL, //!基地址
    // headers: { //请求头
    //     token: getToken()
    // }

});


//!axios拦截器 ,只要是通过requestQ发送的请求都会被拦截下来,config就是被拦截下来的请求的配置
requestQ.interceptors.request.use(function (config) {

        //给每一次放松请求拦截下来后加一个请求头token
        config.headers.token = getToken();
        return config
    },
    err => {
        return Promise.reject(err)
    })

export default requestQ