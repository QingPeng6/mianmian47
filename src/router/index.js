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
        component: login, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件

        //! meta是路由元信息,可以给这个路由定义标签,让它可以被获取到使用 
        meta: {
            title: '登录'
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
            title: '首页'
        },
        children: [
            //todo 子路由一般不加'/'
            {
                path: 'user',
                component: user,
                meta: {
                    title: '用户列表'
                }
            },
            {
                path: 'enterprise',
                component: enterprise,
                meta: {
                    title: '企业列表'
                }
            }, {
                path: 'data',
                component: data,
                meta: {
                    title: '数据概览'
                }
            }, {
                path: 'subject',
                component: subject,
                meta: {
                    title: '学科列表'
                }
            }, {
                path: 'question',
                component: question,
                meta: {
                    title: '题库列表'
                }
            },
        ]
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
                //发送res里的值给vuex 保存起来
                store.commit('changeName', res.data.data.username);
                store.commit('changeImg', process.env.VUE_APP_URL + "/" + res.data.data.avatar);

                next()
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