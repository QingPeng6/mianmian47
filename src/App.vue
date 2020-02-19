<template>
  <div>
    成功
    <el-button type="success">成功按钮</el-button>
    <el-button round>圆角按钮</el-button>
    <el-button type="primary" round>主要按钮</el-button>
    <el-button type="success" round>成功按钮</el-button>
    <el-button type="info" round>信息按钮</el-button>
    <el-button type="warning" round>警告按钮</el-button>
    <el-button type="danger" round>危险按钮</el-button>
    <button @click="goSon">点击到login</button>
    <router-view></router-view>
    <router-link to="/">到首页</router-link>
  </div>
</template>

<script>
export default {
  props: {},
  //数据
  data() {
    return {};
  },
  //方法
  methods: {
    goSon() {
      this.$router.push("/login");
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

<style>
</style>

