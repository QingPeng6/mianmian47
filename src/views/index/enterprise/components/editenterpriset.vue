<template>
  <div>
    <el-dialog center title="编辑企业" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="企业名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="企业简称"
          :label-width="formLabelWidth"
          prop="short_name"
        >
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="goEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { edit_enterprise } from "@/api/enterprise.js";
export default {
  props: {},
  //数据
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ]
      }
    };
  },
  //方法
  methods: {
    goEdit() {
      //进行表单验证
      this.$refs.form.validate(v => {
        //如果验证成功就发送 新增数据的请求
        if (v) {
          edit_enterprise(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("修改成功");
              this.$parent.post_enterprise(); //给父组件的数据刷新
              this.dialogFormVisible = false; //新增对话框隐藏
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
  watch: {},
  //子页面
  components: {}
};
</script>

<style>
.el-dialog--center {
  width: 600px !important;
}
</style>
