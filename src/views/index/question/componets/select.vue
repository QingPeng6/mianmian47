<template>
  <div>
    <div class="A">
      <el-radio :label="label" v-if="duoX"></el-radio>
      <el-checkbox :label="label" v-else></el-checkbox>
      <el-input class="danInput" v-model="mytext" @input="onInput"> </el-input>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectSon",

  props: {
    duoX: {
      type: Boolean,
      default: true
    },
    label: {},
    txt: {},
    imgss: {}
  },
  //数据
  data() {
    return {
      //   label: "",
      imageUrl: this.imgss,
      mytext: this.txt
    };
  },
  //方法
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);

      this.$emit('updata:imgss',res.data.url)
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
    },
    onInput(){
        this.$emit('updata:txt',this.mytext)
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
.A {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  .danInput .el-input__inner {
    width: 496px !important;
    height: 40px;
    margin-right: 20px;
  }
  
}
</style>
