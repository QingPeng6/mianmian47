//导入vue
import Vue from 'vue'

//导入vuex
import store from '@/store/vuex'

//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

//引入使用token获取用户信息方法
import {
    get_user
} from "@/api/index.js";

//引入删除token方法
import {
    removeToken
} from '@/utilis/token.js'
//导入element里的message方法
import {
    Message
} from 'element-ui';

//!引入抽取出的子路由
import children from './children'


import bb from '../components/bb.vue'
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'
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
        component: login, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件

        //! meta是路由元信息,可以给这个路由定义标签,让它可以被获取到使用 
        meta: {
            title: '登录',
            roles: ['超级管理员', '管理员', '老师', '学生']
        }
    }, {
        path: '/go', //配置地址
        component: bb, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        meta: {
            title: '白名单'
        }
    }, {
        path: '/index', //配置地址
        component: index, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        meta: {
            title: '首页',
            roles: ['超级管理员', '管理员', '老师', '学生']
        },
        children
    }, {
        //路由重定向:匹配不到的地址,让它跳转的地址
        path: '*', //匹配不到的地址
        redirect: '/login' //这里要填入一个跳转对应的地址
    }]
})

//?创建路由白名单

let whiteQ = ['/login', '/go'];

//todo导航守卫  路由跳转前触发
// 参数1：to：到哪去
// 参数2：from：从哪来
// 参数3: next 控制去哪里
router.beforeEach((to, from, next) => {
    // nprogress进度条 开始
    NProgress.start()
    //跳转到下一个页面
    // console.log(to);
    //判断只要不是跳转登录页面就进行判断
    // if (to.path != '/login') {


    //*判断只要不是跳转白名单页面就进行下面代码
    if (whiteQ.includes(to.path) != true) {
        // console.log('123');

        //假如有伪造token访问页面就要导航守卫进行判断token值是否正确
        //调用获取用户信息方法,如果token对的就让它进行跳转
        get_user().then(res => {
            console.log('导航守卫-跳转前:', res);

            if (res.data.code == 200) { //如果token是正确的

                if (res.data.data.status) { //判断账号是否被禁用,如果被禁用就不允许登录
                    //发送res里的值给vuex 保存起来
                    store.commit('changeName', res.data.data.username);
                    store.commit('changeImg', process.env.VUE_APP_URL + "/" + res.data.data.avatar);
                    store.commit('changeRole', res.data.data.role);
                    if (from.path == ('/login')) { //，如果是从登录跳过来的，弹出登录成功
                        Message.success("登录成功");
                    }


                    //判断要去的地址包含访问的用户里有没有role的用户,有就放行
                    if (to.meta.roles.includes(res.data.data.role)) {
                        next()

                    } else { //没有就停在原页面

                        next(from.path);
                        Message.warning("无权限");
                        // nprogress进度条 结束
                        NProgress.done()

                    }






                } else {
                    Message.error('账号被禁用');
                    // nprogress进度条 结束
                    NProgress.done()
                }

            } else {
                //如果token是错的就提示
                Message.error('请重新登录')
                // nprogress进度条 结束
                NProgress.done()
                //跳到登录页前删除伪造token
                removeToken()
                next('/login')

            }
        })

    } else {
        //如果是去白名单页面就放行
        next()
    }
})

//todo导航守卫  路由跳转后

// 跳转之后的函数，是在跳转完触发的
// 参数1：to：到哪去
// 参数2：from：从哪来
router.afterEach((to) => {

    //通过to属性修改网页标题名字 跳转完毕当前路由元信息里的title值就赋给网页标题
    document.title = to.meta.title

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