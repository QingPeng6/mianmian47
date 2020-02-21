<template>
  <div>
    <!-- center属性写上 就让那一行居中 / width设置宽度 -->
    <el-dialog
      title="用户注册"
      center
      width="603px"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="passWord"
        >
          <el-input v-model="form.passWord" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="imgURL" alt class="imgs" @click="getImg" />
          </el-col>
        </el-form-item>

        <el-form-item label="验证码" :label-width="formLabelWidth" prop="ycode">
          <el-col :span="16">
            <el-input v-model="form.ycode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- disabled控制按钮是否禁用 ,如果sec!=0,就是true,就是不禁用 /false的时候就是禁用当前按钮 -->
            <el-button :disabled="sec != 0" @click="getCode">{{
              sec == 0 ? "获取用户验证码" : "还剩" + sec + "秒"
            }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  props: {},
  //数据
  data() {
    return {
      sec: 0, //获取验证码的时间
      //控制注册框显示隐藏
      dialogFormVisible: false,
      //验证码图片
      imgURL: process.env.VUE_APP_picURL + "/captcha?type=sendsms",
      //表单的左边文字距离
      formLabelWidth: "80px",
      form: {
        name: "",
        email: "",
        phone: "",
        passWord: "",
        code: "",
        ycode: ""
      },
      rules: {
        name: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入您的昵称", trigger: "blur" }
        ],
        //密码验证
        passWord: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入您的密码", trigger: "blur" },
          //min: 3, max: 5 (最小3位,最大5位) ,如果内容不符合要求就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          {
            min: 6,
            max: 10,
            message: "密码长度在 6 到 10 个字符",
            trigger: "change"
          }
        ],
        email: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          {
            //pattern就是数据的值,判断数据的值包含
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱输入错误",
            //  trigger: "change"(在值改变的的时候判断)
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          {
            //pattern就是数据的值,判断数据的值包含
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号输入错误",
            //  trigger: "change"(在值改变的的时候判断)
            trigger: "blur"
          }
        ],
        code: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入右边的图形码", trigger: "blur" }
        ],
        ycode: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          {
            required: true,
            message: "请输入获取到的手机验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //方法
  methods: {
    //更换图形验证码
    getImg() {
      //重新给服务器发送请求获取验证码
      this.imgURL =
        process.env.VUE_APP_picURL + "/captcha?type=sendsms&sb=" + Date.now(); // 时间戳Date.now()
    },
    getCode() {
      this.sec = 60; //把获取验证码的时间改成60秒
      //设置定时器,60秒--,当60秒过后,定时器停止
      let cTime = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(cTime);
        }
      }, 100);

      this.$axios({
        url: "/sendsms",
        method: "post",
        data: { code: this.form.code, phone: this.form.phone },
        withCredentials: true
      }).then(res => {
        //成功回调
        console.log(res);
        alert(res.data.message);
      });
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
    console.log(process.env.VUE_APP_picURL);
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {
    //监听注册表单的显示与隐藏，只要发生改变就重置表单
    // 'dialogFormVisible'() {
    //   this.$refs.form.resetFields();
    //   console.log('123');
    // }
  },
  //子页面
  components: {}
};
</script>

<style lang="less">
.imgs {
  height: 41px;
  width: 100%;
}

.el-dialog__header {
  background: linear-gradient(to right, #00afee, #1791fd);
  .el-dialog__title {
    color: white !important;
    font-size: 17px;
  }
}
</style>
