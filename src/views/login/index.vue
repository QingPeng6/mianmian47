<template>
  <div class="login-wrap">
    <div class="login-box">
      <el-form class="login-form">
        <el-form-item class="btn-box">
          <el-button type="primary">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./背景.png" alt />
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
  methods: {},
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

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 给父盒子设置弹性盒子 */
  display: flex;
  /* 主轴(默认从左到右)排列为   元素左右间距相同 */
  justify-content: space-around;
  /* 侧轴(默认从上到下)排列为   居中对齐 */
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
  }
}
.btn-box {
  button {
    width: 394px;
    height: 40px;
    background: rgba(20, 147, 250, 1);
    border-radius: 4px;
  }
}
</style>
