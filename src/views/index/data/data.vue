<template>
  <div class="databox">
    <el-card class="box-card1">
      <ul>
        <li>
          <span class="span1">1{{ list.increment_users }}</span
          ><span>今日新增用户</span>
        </li>
        <li>
          <span class="span1">{{ list.total_users }}</span
          ><span>总用户量</span>
        </li>
        <li>
          <span class="span1">{{ list.increment_questions }}</span
          ><span>新增试题</span>
        </li>
        <li>
          <span class="span1">{{ list.total_questions }}</span
          ><span>总试题量</span>
        </li>
        <li>
          <span class="span1">{{ list.total_done_questions }}</span
          ><span>总刷题量</span>
        </li>
        <li>
          <span class="span1">{{ list.personal_questions }}</span
          ><span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card2">
      <div class="box2" ref="box2"></div>
    </el-card>
  </div>
</template>

<script>
import { get_title, get_statistics } from "@/api/data.js";

import echarts from "echarts";
export default {
  props: {},
  //数据
  data() {
    return {
      list: ""
    };
  },
  //方法
  methods: {},
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
    get_title().then(res => {
      console.log("数据概览的数据面板:", res);
      this.list = res.data.data;
    });
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {
    get_statistics().then(res => {
      console.log(res);
      var nameArr = res.data.data.map(item => {
        return item.name;
      });

      var myChart = echarts.init(this.$refs.box2);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "数据概览"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: nameArr
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style lang="less">
.databox {
  .box-card2 {
    .box2 {
      height: 600px;
    }
  }
  .box-card1 {
    margin-bottom: 30px;
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        // justify-content: center;
        //  flex-direction: column;
        align-items: center;
        // flex-direction: column;

        .span1 {
          margin-bottom: 10px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 2px solid #0094ff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
