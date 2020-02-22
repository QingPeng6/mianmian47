<template>
  <div class="login-wrap">
    <!-- 左侧登录盒子 -->
    <div class="login-box">
      <!-- 顶部盒子 -->
      <div class="title-box">
        <img src="./M图.png" alt />
        <span class="left">黑马万山</span>
        <span class="xian"></span>
        <span class="right">用户登录</span>
      </div>
      <el-form class="form" ref="form" :rules="rules" :model="form">
        <el-form-item prop="phone">
          <!-- 使用clearable属性即可得到一个可清空的输入框 -->
          <el-input
            clearable
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            v-model="form.phone"
            class="Vinput"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <!-- 加show-password 就是显示隐藏密码 -->
          <el-input
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
            v-model="form.pass"
            class="Vinput"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="form.code"
                class="input3"
              ></el-input>
            </el-col>

            <el-col :span="7">
              <!-- 设置双向绑定img的src -->
              <img
                :src="imgURL"
                class="captcha"
                alt
                ref="captcha"
                @click="getRandomCode"
              />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item class="GG" prop="checked">
          <div class>
            <el-checkbox v-model="form.checked"></el-checkbox>
            <span>
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">用户协议</el-link>
            </span>
          </div>
        </el-form-item>

        <el-form-item class="btn-box">
          <el-button type="primary" @click="resetForm">登录</el-button>
          <br />
          <el-button type="primary" @click="showReg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册框 -->
    <reg ref="reg"></reg>
    <!-- 右侧图片 -->
    <img src="./背景.png" alt />
  </div>
</template>

<script>
//导入子组件reg
import reg from "./components/register";
export default {
  props: {},
  //数据
  data() {
    return {
      imgURL: process.env.VUE_APP_picURL + "/captcha?type=sendsms", //img的路径
      //跟表单双向绑定的内容
      form: {
        pass: "",
        phone: "",
        code: "",
        checked: false
      },
      //表单验证  规则对象
      rules: {
        //手机号验证
        phone: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入手机号码", trigger: "blur" },
          //min: 3, max: 5 (最小3位,最大5位) ,如果内容不符合要求就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        //密码验证
        pass: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入密码", trigger: "blur" },
          //min: 3, max: 5 (最小3位,最大5位) ,如果内容不符合要求就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        code: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        checked: [
          {
            //因为checked的值不可能为空,所以不能拿值是否为空来判断
            //pattern就是数据的值,判断数据的值包含true嘛,如果不包含就显示必须同意用户协议
            pattern: /true/,
            message: "必须同意用户协议",
            //  trigger: "change"(在值改变的的时候判断)
            trigger: "change"
          }
        ]
      }
    };
  },
  //方法/
  methods: {
    getRandomCode() {
      // 时间戳
      this.imgURL =
        process.env.VUE_APP_picURL + `/captcha?type=login&${Date.now()}`;
      // 随机数
      // this.$refs.captcha.src=`http://127.0.0.1/heimamm/public/captcha?type=login&${Math.random()}`
    },
    resetForm() {
      // 把form表单 规则给全部判断一次,如果规则正确,v就是true,如果有一项不正确,就是false
      this.$refs.form.validate(v => {
        if (v) {
          alert("提交成功!");
        } else {
          console.log("提交失败,至少有一项填的不标准");
          return false;
        }
      });
    },
    //注册的点击事件
    showReg() {
      //找到子组件reg的dialogFormVisible属性，设置为true  /就控制了对话框的显示
      this.$refs.reg.dialogFormVisible = true;
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
  components: {
    reg
  }
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

  //左边盒子
  .login-box {
    //设置盒子不会被撑开
    box-sizing: border-box;

    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-top: 50px;
    padding-left: 48px;
    padding-right: 43px;
    //顶部黑马面面模块
    .title-box {
      display: flex;
      align-items: center;
      margin-bottom: 29px;
      img {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }

      .left {
        margin-right: 14px;
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }

      .xian {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }

    //表单布局
    .form {
      img {
        width: 100%;
        vertical-align: middle;
        // height: 42px;
      }

      // .GG {
      // .el-checkbox__input {
      //   margin-right: -6px;
      // }
      // a {
      //   text-decoration: none;
      //   color: #3296fa;
      // }
      // }
      //按钮盒子
      .btn-box {
        button {
          width: 394px;
          height: 40px;
          background: rgba(20, 147, 250, 1);
          border-radius: 4px;
          margin-bottom: 30px;
        }
      }
      // .el-checkbox__label {
      //   display: flex;
      //   align-items: center;
      // }

      // .el-checkbox {
      //   display: flex;
      // align-items: center;
      // }
      .el-link--inner {
        margin-top: -3px;
      }
    }
  }
  // .Vinput {
  //   width: 394px;
  //   height: 45px;
  //   border-radius: 4px;
  // }
}
</style>
