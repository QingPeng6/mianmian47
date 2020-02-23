//导入axios
import axios from 'axios';

//把获取短信验证码方法封装抛出
export function get_login(data) {
    return axios({
        //地址
        url: process.env.VUE_APP_URL + "/login",
        method: 'post',
        data,
        //携带cookie
        withCredentials: true
    })
}