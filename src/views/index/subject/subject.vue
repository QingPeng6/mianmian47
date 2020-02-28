<template>
  <div>
    <!-- 上面的学科表单开始 -->
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input class="duan" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="chang" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="duan" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="chang" v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchX">搜索</el-button>
          <el-button @click="clearX">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addS.dialogFormVisible = true"
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
        :page-sizes="[5, 10, 15, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <addS ref="addS"></addS>
  </div>
</template>

<script>
import addS from "./components/addSubject";
import { get_subject, change_subject } from "@/api/subject.js";

export default {
  props: {},
  //数据
  data() {
    return {
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },

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
    //清除学科搜索
    clearX() {
      this.page = 1; //搜索第一页的数据
      this.$refs.formInline.resetFields(); //清空搜索表单内容,需要加prop值,否则无效
      this.post_subject(); //清空表单后再搜索获取学科数据
    },

    //表格
    handleClick(row) {
      console.log(row);
    },

    //搜索学科事件
    searchX() {
      this.page = 1; //搜索第一页的数据
      this.post_subject();
    },
    //分页插件

    //页容量变化事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val; //页容量赋值
      this.page = 1; //页码回到第一页
      this.post_subject();
    },

    //页码变化事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.post_subject();
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

    post_subject() {
      get_subject({
        page: this.page,
        limit: this.size,
        ...this.formInline //解构语法
        // rid: this.formInline.rid,
        // name: this.formInline.name,
        // username: this.formInline.username,
        // status: this.formInline.status
      }).then(res => {
        console.log("表格数据:", res);

        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
    //调用获取学科信息方法
    this.post_subject();
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {
    addS
  }
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
