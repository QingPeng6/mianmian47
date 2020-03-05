
import requestQ from '@/utilis/request'


//获取数据信息
export function get_data(data) {

    return requestQ({
        url: '/data/title',
        method: 'post',
        data
    })
}


//获取图表信息
export function get_dataE(data) {

    return requestQ({
        url: '/data/statistics',
        method: 'post',
        data
    })
}
