<template>
  <div>
    <el-cascader
      v-model="xxoo"
      :options="options"
      :props="{ expandTrigger: 'hover', value: 'label' }"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  props: {
    value: {}
  },
  //数据
  data() {
    return {
      xxoo: this.value,
      options: regionDataPlus
    };
  },
  //方法
  methods: {
    handleChange() {
      this.$emit("input", this.xxoo);
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {},
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style></style>
