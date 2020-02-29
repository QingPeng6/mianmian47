// import axios from 'axios';


// import {
//     getToken
// } from '@/utilis/token.js' //*导入获取token方法

// //克隆axios
// let enterpriseQ = axios.create({
//     baseURL: process.env.VUE_APP_URL, //!基地址
//     // headers: { //请求头
//     //     token: getToken()
//     // }

// });


// //!axios拦截器 ,只要是通过enterpriseQ发送的请求都会被拦截下来,config就是被拦截下来的请求的配置
// enterpriseQ.interceptors.request.use(function (config) {

//         //给每一次放松请求拦截下来后加一个请求头token
//         config.headers.token = getToken();
//         return config
//     },
//     err => {
//         return Promise.reject(err)
//     })


import requestQ from '@/utilis/request'

//获取企业信息

export function get_enterprise(params) {

    return requestQ({
        url: '/enterprise/list',
        method: 'get',
        params
    })
}

//修改企业状态

export function change_enterprise(data) {

    return requestQ({
        url: '/enterprise/status',
        method: 'post',
        data
    })
}


//新增企业

export function add_enterprise(data) {

    return requestQ({
        url: '/enterprise/add',
        method: 'post',
        data
    })
}

//修改企业
export function edit_enterprise(data) {

    return requestQ({
        url: '/enterprise/edit',
        method: 'post',
        data
    })
}


//删除企业
export function remove_enterprise(data) {

    return requestQ({
        url: '/enterprise/remove',
        method: 'post',
        data
    })
}
