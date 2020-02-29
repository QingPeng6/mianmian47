import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    //state存储应用层的状态
    state: {
        userName: '', //用户名
        userImg: '', //用户头像
        role: '', //当前用户身份
    },
    mutations: {
        //修改用户名
        changeName(state, value) {
            state.userName = value;
        },
        //修改用户头像
        changeImg(state, value) {
            state.userImg = value;
        },
        //修改用户身份
        changeRole(state, value) {
            state.role = value;
        },
    }
})

export default store