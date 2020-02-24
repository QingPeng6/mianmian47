

//声明一个常量用来保存token
const TOKENKEY = 'mmtoken'
//封装token方法


//取token方法
export function getToken() {
    return window.localStorage.getItem(TOKENKEY) //从window里面取出token
}

//存token方法
export function setToken(token) {
    return window.localStorage.setItem(TOKENKEY,token) //从window里面存入token
}

//删除token方法
export function removeToken() {
    return window.localStorage.removeItem(TOKENKEY) //从window里面删除token
}