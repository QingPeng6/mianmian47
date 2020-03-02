<template>
  <div>
    <el-dialog
      center
      :title="isAdd ? '新增企业' : '编辑企业'"
      :visible.sync="dialogFormVisible"
    >
      <!-- <el-dialog center title="编辑企业" :visible.sync="dialogFormVisible"> -->
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
        <el-form-item
          label="企业简介"
          :label-width="formLabelWidth"
          prop="intro"
        >
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="企业备注"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add_enterprise, edit_enterprise } from "@/api/enterprise.js";
export default {
  name: "enSON",
  props: {},
  //数据
  data() {
    return {
      isAdd: true, //判断点进来是新增还是编辑
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
    save() {
      //进行表单验证
      this.$refs.form.validate(v => {
        //如果验证成功就发送 新增数据的请求
        if (v) {
          if (this.isAdd) {
            add_enterprise(this.form).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增成功");

                this.$parent.post_enterprise(); //给父组件的数据刷新
                this.dialogFormVisible = false; //新增对话框隐藏
                this.$refs.form.resetFields(); //重置表单数据
              } else {
                this.$message.error(res.data.message); //如果服务器请求失败弹出
              }
            });
          } else {
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

<style scoped>
.el-dialog--center {
  width: 600px !important;
}
</style>
