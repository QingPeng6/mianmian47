
import requestQ from '@/utilis/request'

//获取题目列表

export function get_question(params) {

    return requestQ({
        url: '/question/list',
        method: 'get',
        params
    })
}

//获取题目信息
export function one_question(data) {

    return requestQ({
        url: '/question/one',
        method: 'post',
        data
    })
}

//修改状态

export function change_question(data) {

    return requestQ({
        url: '/question/status',
        method: 'post',
        data
    })
}


//新增题目

export function add_question(data) {

    return requestQ({
        url: '/question/add',
        method: 'post',
        data
    })
}

//修改题目
export function edit_question(data) {

    return requestQ({
        url: '/question/edit',
        method: 'post',
        data
    })
}


//删除题目
export function remove_question(data) {

    return requestQ({
        url: '/question/remove',
        method: 'post',
        data
    })
}
