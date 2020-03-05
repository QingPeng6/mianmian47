
import requestQ from '@/utilis/request'

//获取用户信息

export function get_title(params) {

    return requestQ({
        url: '/data/title',
        method: 'get',
        params
    })
}

export function get_statistics(data) {

    return requestQ({
        url: '/data/statistics',
        method: 'post',
        data
    })
}

