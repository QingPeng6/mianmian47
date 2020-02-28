<template>
  <div>
    <!-- 上面的学科表单开始 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="duan" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="chang" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="duan" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            class="chang"
            v-model="formInline.region"
            placeholder="活动区域"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="dialogFormVisible = true"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 上面的学科表单结束 -->

    <!-- 下面的学科表单开始 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <!-- 自定义列   -->
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="change(scope.row.id)">{{
              scope.row.status === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 下面的学科表单结束 -->

    <!-- 新增学科对话框开始 -->
    <el-dialog class="xuek" title="新增学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="num" label="学科编号" :label-width="formLabelWidth">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="学科名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          prop="short"
          label="学科简称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.short"></el-input>
        </el-form-item>
        <el-form-item
          prop="intro"
          label="学科简介"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item
          prop="remark"
          label="学科备注"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noAdd">取 消</el-button>
        <el-button type="primary" @click="addS">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增学科对话框结束 -->
  </div>
</template>

<script>
import { get_subject, change_subject, add_subject } from "@/api/subject.js";
export default {
  props: {},
  //数据
  data() {
    return {
      dialogFormVisible: false,

      //新增学科表单
      form: {
        num: "",
        name: "",
        short: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "100px", //表单的内容
      formInline: {},
      page: 1, //当前页
      size: 5, //页容量
      total: 0, //数据总数量
      tableData: [], //表格数据

      //新增学科验证规则
      rules: {
        num: [
          { required: true, message: "请输入您的学科编号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入您的学科名称", trigger: "blur" }
        ]
      }
    };
  },
  //方法
  methods: {
    //新增取消
    noAdd() {
      //注册成功后关闭表 单
      this.dialogFormVisible = false;
      //清空表单
      this.$refs.form.resetFields();
    },
    //新增学科确定提交
    addS() {
      //表单验证
      this.$refs.form.validate(v => {
        if (v) {
          //全部成功的话就发送axios请求
          add_subject({
            rid: this.form.num,
            name: this.form.name,
            short_name: this.form.short,
            intro: this.form.intro,
            remark: this.form.remark
          }).then(res => {
            console.log("学科列表提交结果:", res);
            if (res.data.code == 200) {
              this.$message.success("提交成功");
              //发送请求至获取表格数据 用来重新渲染
              this.post_subject({ page: this.page, limit: this.size });
              //注册成功后关闭表 单
              this.dialogFormVisible = false;
              //清空表单
              this.$refs.form.resetFields();
            }
          });
        } else {
          this.$message.warning("注册失败:请正确填写");
          console.log("提交失败,至少有一项填的不标准");
          return false;
        }
      });
    },

    //表格
    handleClick(row) {
      console.log(row);
    },

    //页容量变动
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val; //把页容量赋值
      this.post_subject({ page: this.page, limit: this.size });
    },

    //当前页变动
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val; //把当前页码赋值
      // console.log(typeof val);
      console.log(typeof this.page);
      this.post_subject({ page: this.page, limit: this.size });
    },

    //修改学科状态
    change(id) {
      change_subject({ id }).then(res => {
        console.log("学科状态修改结果:", res);
        if (res.data.code == 200) {
          this.post_subject({ page: this.page, limit: this.size });
          this.$message.success("状态更改成功");
        }
      });
    },

    //获取学科信息
    post_subject(params) {
      get_subject(params).then(res => {
        console.log("表格数据:", res);

        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
        // this.page = res.data.data.pagination.page;
      });
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
    this.post_subject({ page: this.page, limit: this.size });
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {}
};
</script>

<style>
.box-card {
  margin-bottom: 20px;
}
.duan {
  width: 100px !important;
  height: 39px;
}

.chang {
  width: 149px !important;
  height: 39px;
}
.el-dialog {
  width: 600px !important;
}
.el-dialog__header {
  /* 给父盒子设置弹性盒子 */
  display: flex;
  /* 主轴(默认从左到右)排列为   元素左右间距相同 */
  justify-content: space-around;
  /* 侧轴(默认从上到下)排列为   居中对齐 */
  align-items: center;
}
.el-dialog__footer {
  /* 给父盒子设置弹性盒子 */
  display: flex;
  /* 主轴(默认从左到右)排列为   元素左右间距相同 */
  justify-content: space-around;
  /* 侧轴(默认从上到下)排列为   居中对齐 */
  align-items: center;
}

.el-dialog__body {
  padding: 20px 20px !important;
}

.el-pagination {
  text-align: center;
  margin-top: 30px;
}
</style>
