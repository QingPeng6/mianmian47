<template>
  <div class="xuanz">
    <el-radio :label="label" v-if="danx"></el-radio>
    <el-checkbox :label="label" v-else></el-checkbox>
    <el-input v-model="mytext" @input="onInput"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      >
      <img v-if="myimag" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "seleSon",

  props: {
    label: {},
    text: {},
    image: {},
    danx: {
      type: Boolean,
      default: true
    }
  },
  //数据
  data() {
    return {
      action: process.env.VUE_APP_URL + "/question/upload",
      imageUrl: "",
      mytext: this.text,
      myimag: this.image
    };
  },
  //方法
  methods: {
    //   输入框发生改变就触发
    onInput() {
        console.log(321);
      this.$emit("update:text", this.mytext);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("题目图片上传:", res);
      this.$emit("update:image", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,不能访问dom,可以访问data与methods
  created() {},
  //渲染页面后执行的生命周期,可以访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style lang="less">
.xuanz {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .el-input {
    margin-right: 30px;
  }
}
</style>
