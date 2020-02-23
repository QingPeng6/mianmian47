//导入axios
import axios from 'axios';

//把获取短信验证码方法封装抛出
export function get_node(data) {
    return axios({
        //地址
        url: process.env.VUE_APP_picURL + "/sendsms",
        method: 'post',
        data,
        withCredentials: true
    })
}