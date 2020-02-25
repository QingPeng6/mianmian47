//导入vue
import Vue from 'vue'

//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

// 0. 导入 子组件
import bb from '../components/bb.vue'
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
import user from '@/views/index/user/user.vue'
import enterprise from '@/views/index/enterprise/enterprise.vue'
import data from '@/views/index/data/data.vue'
import subject from '@/views/index/subject/subject.vue'
import question from '@/views/index/question/question.vue'
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
        path: '/index', //配置地址
        component: index, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        children: [
            //todo 子路由一般不加'/'
            {
                path: 'user',
                component: user
            },
            {
                path: 'enterprise',
                component: enterprise
            }, {
                path: 'data',
                component: data
            }, {
                path: 'subject',
                component: subject
            }, {
                path: 'question',
                component: question
            },
        ]
    }]
    // }, {
    //     //路由重定向:匹配不到的地址,让它跳转的地址
    //     path: '*', //匹配不到的地址
    //     redirect: '/' //这里要填入一个跳转对应的地址
    // }]
})

//todo导航守卫  路由跳转前
router.beforeEach((to, from, next) => {
    // nprogress进度条 开始
    NProgress.start()
    //跳转到下一个页面
    next()
})

//todo导航守卫  路由跳转后
router.afterEach(() => {
    // nprogress进度条 结束
    NProgress.done()
})

// 4. 需要在main.js导入router  注入router
export default router
// import Vue from 'vue';

// import VueRouter from 'vue-router';

// Vue.use(VueRouter);

/* 
优势:组件使用时才加载，不使用时不加载，会对性能有些小优化/2.不用在写import
 */

// const router = new VueRouter({
//     routes: [{
//             path: "/login",
//             component: login => {
//                 require(['@/views/login/index.vue'], login)
//             }
//         },
//         {
//             path: "/index",
//             component: index => {
//                 require(['@/views/index/index.vue'], index);
//             },
//             children: [{
//                 path: 'user',
//                 component: user => {
//                     require(['@/views/index/user/index.vue'], user)
//                 }
//             }]
//         },
//     ]
// })

// export default router