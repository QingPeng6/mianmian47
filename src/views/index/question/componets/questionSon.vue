<template>
  <div>
    <el-dialog
      class="boxque"
      fullscreen
      title="新增题库"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
          <subjectSelect v-model="form.subject"></subjectSelect>
        </el-form-item>

        <el-form-item
          label="企业"
          prop="enterprise"
          :label-width="formLabelWidth"
        >
          <enterpriseSelect v-model="form.enterprise" />
        </el-form-item>

        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
          <el-select v-model="form.step">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="step" :label-width="formLabelWidth">
          <!-- <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader> -->
          <citySon v-model="form.city" />
        </el-form-item>

        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.abc">
            <el-radio label="单选"></el-radio>
            <el-radio label="多选"></el-radio>
            <el-radio label="简答"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="简单"></el-radio>
            <el-radio label="一般"></el-radio>
            <el-radio label="困难"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="xianxian">
          <el-divider></el-divider>
        </el-form-item>

        <el-form-item
          class="stbt"
          label="试题标题"
          :label-width="formLabelWidth"
        >
          <myEdtior class="editor" v-model="form.title" />
        </el-form-item>

        <el-form-item label="单选" :label-width="formLabelWidth">
         
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
import citySon from "./citySon";
import myEdtior from "./myEdtior";
// import { regionDataPlus } from "element-china-area-data";
export default {
  name: "queSon",
  props: {},
  //数据
  data() {
    return {
      form: {},
      dialogFormVisible: true,
      formLabelWidth: "380px"
      // options: regionDataPlus
    };
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
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {
    citySon,
    myEdtior
  }
};
</script>

<style lang="less">
.boxque {
  .el-form {
    margin-left: 100px;
    width: 840px;
    height: 1000px;

    .xianxian {
      width: 840px;
      margin-left: 300px;
    }
    .stbt {
      .el-form-item__label {
        margin-left: 30px;
      }
    }
    .editor {
      width: 840px;
      // margin-left: 300px;

      margin-top: 80px;
      margin-left: -80px;
    }

  
  }

  .el-select {
    width: 380px !important;
  }

  .el-form-item__label {
    padding-right: 41px;
  }

  .el-input__inner {
    width: 380px !important;
  }
}
// .boxque{
//   .el-dialog{
//     .el-dialog__body{
//       .el-form{
//         .el-select{
//            width: 600px !important;
//         }
//       }
//     }
//   }
// }
</style>
