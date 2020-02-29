// import axios from 'axios';


// import {
//     getToken
// } from '@/utilis/token.js' //*导入获取token方法

// //克隆axios
// let requestQ = axios.create({
//     baseURL: process.env.VUE_APP_URL, //!基地址
//     // headers: { //请求头
//     //     token: getToken()
//     // }

// });


//!axios拦截器 ,只要是通过requestQ发送的请求都会被拦截下来,config就是被拦截下来的请求的配置




// requestQ.interceptors.request.use(function (config) {

//         //给每一次放松请求拦截下来后加一个请求头token
//         config.headers.token = getToken();
//         return config
//     },
//     err => {
//         return Promise.reject(err)
//     })

import requestQ from '@/utilis/request'
//获取学科信息

export function get_subject(params) {

    return requestQ({
        url: '/subject/list',
        method: 'get',
        params
    })
}

//修改学科状态

export function change_subject(data) {

    return requestQ({
        url: '/subject/status',
        method: 'post',
        data
    })
}


//新增学科

export function add_subject(data) {

    return requestQ({
        url: '/subject/add',
        method: 'post',
        data
    })
}

//修改学科
export function edit_subject(data) {

    return requestQ({
        url: '/subject/edit',
        method: 'post',
        data
    })
}


//删除学科
export function remove_subject(data) {

    return requestQ({
        url: '/subject/remove',
        method: 'post',
        data
    })
}