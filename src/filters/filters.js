import Vue from 'vue'

//时间插件
import moment from 'moment'

//!给vue加一个过滤器方法 
Vue.filter('filter_time', function (val) {

    //把val给过滤一遍 变成年月日格式返回出去
    return moment(val).format('YYYY-MM-DD')
})