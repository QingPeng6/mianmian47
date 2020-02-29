// 0. 导入 子组件

import user from '@/views/index/user/user.vue'
import enterprise from '@/views/index/enterprise/enterprise.vue'
import data from '@/views/index/data/data.vue'
import subject from '@/views/index/subject/subject.vue'
import question from '@/views/index/question/question.vue'




//把子路由抛出
export default [
    //todo 子路由一般不加'/'
    {
        path: 'data',
        component: data,
        meta: {
            title: '数据概览',
            roles: ['超级管理员', '管理员'],
            icon: 'el-icon-pie-chart'
        }
    },
    {
        path: 'user',
        component: user,
        meta: {
            title: '用户列表',
            roles: ['超级管理员', '管理员'],
            icon: 'el-icon-user'
        }
    }, {
        path: 'question',
        component: question,
        meta: {
            title: '题库列表',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            icon: 'el-icon-edit-outline'
        }
    }, {
        path: 'enterprise',
        component: enterprise,
        meta: {
            title: '企业列表',
            roles: ['超级管理员', '管理员', '老师'],
            icon: 'el-icon-menu'
        }
    }, {
        path: 'subject',
        component: subject,
        meta: {
            title: '学科列表',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            icon: 'el-icon-notebook-2'
        }
    },
]