<template>
  <div>
    <el-dialog center title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select class="chang" v-model="form.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select class="chang" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户备注"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="goAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add_user } from "@/api/user.js";
export default {
  props: {},
  //数据
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  //方法
  methods: {
    goAdd() {
      //进行表单验证
      this.$refs.form.validate(v => {
        //如果验证成功就发送 新增数据的请求
        if (v) {
          add_user(this.form).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("新增成功");

              this.$parent.post_user(); //给父组件的数据刷新
              this.dialogFormVisible = false; //新增对话框隐藏
              this.$refs.form.resetFields(); //重置表单数据
            } else {
              this.$message.error(res.data.message); //如果服务器请求失败弹出
            }
          });
        }
      });
    },
    //取消新增
    cancel() {
      //重置表单,并退出表单
      this.$refs.form.resetFields(); //重置表单数据
      this.dialogFormVisible = false; //新增对话框隐藏
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
  watch: {
    // 'dialogFormVisible'() {
    //   this.$refs.form.resetFields();
    // }
  },
  //子页面
  components: {}
};
</script>

<style>
.el-dialog--center {
  width: 480px !important;
}
</style>
