<template>
  <div>
    <el-select v-model="enterprise" @change="selChange">
      <el-option
        :label="item.name"
        :value="item.eid"
        v-for="(item, index) in this.enterpriselist"
        :key="index"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
//获取企业
import { get_enterprise } from "@/api/enterprise.js";
export default {
  props: {
    value: {
  
    }
  },
  //数据
  data() {
    return {
      enterprise: this.value,
      enterpriselist: []
    };
  },
  //方法
  methods: {
      selChange(){
          this.$emit('input',this.enterprise)
      }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
  
    // 获取启用企业
    get_enterprise({ status: 1 }).then(res => {
      console.log("企业数据:", res);
      this.enterpriselist = res.data.data.items;
    });

  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style></style>
