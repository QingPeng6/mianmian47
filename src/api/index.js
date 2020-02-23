//导入axios
import axios from 'axios';

//把获取短信验证码方法封装抛出
export function get_node(data) {
    return axios({
        //地址
        url: process.env.VUE_APP_URL + "/sendsms",
        method: 'post',
        data,
        withCredentials: true
    })
}

//把注册方法封装抛出
export function get_register(data) {
    return axios({
        //地址
        url: process.env.VUE_APP_URL + "/register",
        method: 'post',
        data,
        withCredentials: true
    })
}