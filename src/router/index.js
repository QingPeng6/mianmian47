//导入vue
import Vue from 'vue'

// 0. 导入 子组件
import bb from '../components/bb.vue'
import login from '../views/login/index.vue'
// 1. 导入 vue-router
import VueRouter from 'vue-router'
//解决同一页面多次访问错误
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
// 2. 注册 vue-router
Vue.use(VueRouter)
// 3. 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [{
        path: '/login', //配置地址
        component: login //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    }, {
        path: '/', //配置地址
        component: bb //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    }, {
        //路由重定向:匹配不到的地址,让它跳转的地址
        path: '*', //匹配不到的地址
        redirect: '/' //这里要填入一个跳转对应的地址
    }]
})


// 4. 需要在main.js导入router  注入router
export default router