<template>
  <div>
    <el-card class="box-card1">
      <ul>
        <li>
          <span class="span1">{{ sTable.increment_users }}</span
          ><span>新增用户量</span>
        </li>
        <li>
          <span class="span1">{{ sTable.total_users }}</span
          ><span>总用户量</span>
        </li>
        <li>
          <span class="span1">{{ sTable.increment_questions }}</span
          ><span>新增试题</span>
        </li>
        <li>
          <span class="span1">{{ sTable.total_questions }}</span
          ><span>总试题量</span>
        </li>
        <li>
          <span class="span1">{{ sTable.total_done_questions }}</span
          ><span>总刷题量</span>
        </li>
        <li>
          <span class="span1">{{ sTable.personal_questions }}</span
          ><span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card2">
      <div class="bbooxx" ref="bbooxx"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { get_data, get_dataE } from "@/api/data.js";
export default {
  props: {},
  //数据
  data() {
    return {
      sTable: []
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
    get_data().then(res => {
      console.log("上面图表数据获取", res);
      this.sTable = res.data.data;
    });
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {
    get_dataE().then(res => {
      console.log("下面图表数据", res);

      var data1 = res.data.data.map(item => {
        return item.name;
      });

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.bbooxx);

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
          data: data1
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
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

<style scoped lang="less">
.box-card1 {
  ul {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;

      // justify-content: space-around;
      .span1 {
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        font-size: 30px;
        border: 1px solid #0094ff;
      }
    }
  }
}
.box-card2 {
  // display: flex;
  margin-top: 30px;
  .bbooxx {
    height: 800px;
  }
}
</style>
