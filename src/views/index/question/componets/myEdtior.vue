<template>
  <div>
    <div id="div1" class="toolbar" ref="toolbar"></div>

    <div id="div2" class="text" ref="text">
      <!--可使用 min-height 实现编辑区域自动增加高度-->
    
    </div>
  </div>
</template>

<script>
import wangeditor from "wangeditor";
export default {
  name: "myEdtior",
  props: {
    value: {}
  },
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
  mounted() {
    let editor1 = new wangeditor(this.$refs.toolbar, this.$refs.text); // 两个参数也可以传入 elem 对象，class 选择器

    editor1.customConfig.onchange = html => {
      //   console.log("触发了" + html);
      this.$emit("input", html); 
    };
    editor1.create();
  },
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style scoped>
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 50px;
}
</style>
