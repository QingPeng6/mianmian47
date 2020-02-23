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
        <el-form-item label="头像" :label-width="formLabelWidth" prop="pic">
          <!-- 头像上传 
          :show-file-list="false" 是否显示图片名
          :on-success="handleAvatarSuccess" 上传成功调用的函数方法
          :before-upload="beforeAvatarUpload" 上传之前调用的函数方法
          
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> 我们看到的+号
          -->
          <el-upload
            name="image"
            class="avatar-uploader"
            :action="picU"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

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
        <el-button @click="clearC">取 消</el-button>
        <el-button type="primary" @click="goYZ">确 定</el-button>
      </div>
      <!-- <el-button  @click="open2">成功</el-button>
      <el-button  @click="open3">警告</el-button>
      <el-button  @click="open1">消息</el-button>
      <el-button  @click="open4">错误</el-button> -->
    </el-dialog>
  </div>
</template>

<script>
//接收获取短息验证码方法
import { get_node, get_register } from "../../../api/index.js";
// import axios from "axios";
export default {
  props: {},
  //数据
  data() {
    return {
      sec: 0, //获取验证码的时间
      //控制注册框显示隐藏
      dialogFormVisible: false,
      //验证码图片 调用环境变量
      imgURL: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //表单的左边文字距离
      formLabelWidth: "80px",
      picU: process.env.VUE_APP_URL + "/uploads", //头像路径接口

      imageUrl: "", //绑定头像图片
      form: {
        pic: "", //头像
        name: "", //用户名
        email: "", //邮箱
        phone: "", //手机
        passWord: "", //密码
        code: "", //图形码
        ycode: "" //手机验证码
      },
      rules: {
        pic: [{ required: true, message: "请选择你的头像", trigger: "blur" }],
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
          { required: true, message: "请输入右边的图形码", trigger: "blur" },
          { len: 4, message: "图形验证码是4位数", trigger: "blur" }
        ],
        ycode: [
          //required:true (必须输入内容) ,如果内容为空就显示 (message) , trigger: "blur"(在失去焦点的时候判断)
          {
            required: true,
            message: "请输入获取到的手机验证码",
            trigger: "blur"
          },
          {
            len: 4,
            message: "手机验证码是4位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //方法
  methods: {
    //提交注册按钮点击事件
    goYZ() {
      this.$refs.form.validate(v => {
        if (v) {
          // alert("提交成功!");
          //全部成功的话就发送axios请求
          get_register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.pic,
            password: this.form.passWord,
            rcode: this.form.ycode
          }).then(res => {
            console.log("注册后返回:", res);
            if (res.data.code == 200) {
              this.$message.success("你已经注册成功");
              //注册成功后关闭表单
              this.dialogFormVisible = false;
              //清空表单
              this.$refs.form.resetFields();
              //清空表单不会清空表单外的img路径,需要手动清空
              this.imageUrl = "";
              //重新给服务器发送请求获取验证码
              this.getImg();
            } else {
              this.$message.error("注册失败:" + res.data.message);
            }
          });
        } else {
          this.$message.warning("注册失败:请正确填写");
          console.log("提交失败,至少有一项填的不标准");
          return false;
        }
      });
    },
    //注册界面的取消 清空表单跟img图片路径
    clearC() {
      //注册成功后关闭表 单
      this.dialogFormVisible = false;
      //清空表单
      this.$refs.form.resetFields();
      //清空表单不会清空表单外的img路径,需要手动清空
      this.imageUrl = "";
      //重新给服务器发送请求获取验证码
      this.getImg();
    },
    //更换图形验证码
    getImg() {
      //重新给服务器发送请求获取验证码
      this.imgURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&sb=" + Date.now(); // 时间戳Date.now()
    },
    getCode() {
      //进行判断手机号是否输入正确
      //如果输入错误就弹出提示框, return阻止后面的代码运行
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        this.$message.error("手机号输入错误");
        return;
      }
      //进行判断验证码格式是否输入正确
      //如果输入错误就弹出提示框, return阻止后面的代码运行
      if (this.form.code.length != 4) {
        this.$message.error("验证码格式错误");
        return;
      }
      this.sec = 60; //把获取验证码的时间改成60秒
      //设置定时器,60秒--,当60秒过后,定时器停止
      let cTime = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(cTime);
        }
      }, 100);

      //获取手机验证码
      // this.$axios({
      //   url: "/sendsms",
      //   method: "post",
      //   data: { code: this.form.code, phone: this.form.phone },
      //   withCredentials: true
      // }).then(res => {
      //   //成功回调
      //   console.log(res);
      //   // alert(res.data.message);
      //   if (res.data.code == 200) {
      //     //弹出成功提示框
      //     this.$message.success(res.data.message);
      //   } else {
      //     //弹出失败提示框
      //     this.$message.error(res.data.message);
      //   }
      // });

      //获取短信验证码
      get_node({ code: this.form.code, phone: this.form.phone }).then(res => {
        //成功回调
        console.log("获取短信验证码:", res);
        // alert(res.data.message);
        if (res.data.code == 200) {
          //弹出成功提示框
          this.$message.success("获取到验证码是" + res.data.data.captcha);
        } else {
          //弹出失败提示框
          this.$message.error(res.data.message);
        }
      });
    },
    //把上传的文件做成临时url绑定给图片的src
    handleAvatarSuccess(res, file) {
      console.log("上传图片:", res);
      this.imageUrl = URL.createObjectURL(file.raw);

      //把form里面pic 赋值 服务器传过来的图片路径
      this.form.pic = res.data.file_path;

      //给表单里的图片单独做一次检验
      this.$refs.form.validateField("pic");
    }, //在上传之前判断文件的格式是否合法,以及文件是否小于2M
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif"; //图片是不是jpg格式
      const isLt2M = file.size / 1024 / 1024 < 2; //文件是否小于2M

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
    // open1() {
    //   this.$message("这是一条消息提示");
    // },
    // open2() {
    //   this.$message({
    //     message: "恭喜你，这是一条成功消息",
    //     type: "success"
    //   });
    // },

    // open3() {
    //   this.$message({
    //     message: "警告哦，这是一条警告消息",
    //     type: "warning"
    //   });
    // },

    // open4() {
    // 代码的缩写
    //   this.$message.error("错了哦，这是一条错误消息");
    // }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
    // console.log(process.env.VUE_APP_URL);
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
  vertical-align: middle;
}

.el-dialog__header {
  background: linear-gradient(to right, #00afee, #1791fd);
  .el-dialog__title {
    color: white !important;
    font-size: 17px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important ;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  text-align: center;
  padding-right: 50px;
}
</style>
