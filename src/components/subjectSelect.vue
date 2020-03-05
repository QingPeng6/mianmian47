<template>
  <div>
    <el-select v-model="subject" @change="selChange">
      <el-option
        :label="item.name"
        :value="item.id"
        v-for="(item, index) in this.subjectlist"
        :key="index"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
//获取学科
import { get_subject } from "@/api/subject.js";
export default {
  props: {
    value: {
      default: ""
    }
  },
  //数据
  data() {
    return {
      subject: this.value,
      subjectlist: []
    };
  },
  //方法
  methods: {
    selChange() {
      this.$emit("input", this.subject);
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
    get_subject().then(res => {
      console.log("学科数据:", res);
      this.subjectlist = res.data.data.items;
    });
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {
    value(val) {
      this.subject = val;
    }
  },
  //子页面
  components: {}
};
</script>

<style></style>
