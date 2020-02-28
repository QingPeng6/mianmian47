<template>
  <div>
    <!-- 上面的用户表单开始 -->
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input class="duan" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="chang" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-input class="duan" v-model="formInline.role"></el-input>
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
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 上面的用户表单结束 -->

    <!-- 下面的用户表单开始 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <!-- 自定义列   -->
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editSub(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="change(scope.row.id)">{{
              scope.row.status === 1 ? "禁用" : "启用"
            }}</el-button>
            <el-button type="text" size="small" @click="remove(scope.row.id)"
              >删除</el-button
            >
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
      ></el-pagination>
    </el-card>

    <addS ref="addS"></addS>
    <editS ref="editS"></editS>
  </div>
</template>

<script>
import addS from "./components/adduser";

import editS from "./components/edituser";
import { get_user, change_user, remove_user } from "@/api/user.js";

export default {
  name: "subssss",
  props: {},
  //数据
  data() {
    return {
      oldItem: "", //用来判断是否修改的是同一个
      formInline: {
        
      },

      page: 1, //当前页
      size: 5, //页容量
      total: 0, //数据总数量
      tableData: [], //表格数据

      //新增用户验证规则
      rules: {
        num: [
          { required: true, message: "请输入您的用户编号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入您的用户名称", trigger: "blur" }
        ]
      }
    };
  },
  //方法
  methods: {
    //清除用户搜索
    clearX() {
      this.page = 1; //搜索第一页的数据
      this.$refs.formInline.resetFields(); //清空搜索表单内容,需要加prop值,否则无效
      this.post_user(); //清空表单后再搜索获取用户数据
    },

    //修改用户
    editSub(item) {
      console.log("当前点击行的数据:", item);
      this.$refs.editS.dialogFormVisible = true;

      if (item != this.oldItem) {
        this.$refs.editS.form = { ...item };
        this.oldItem = item;
      }
    },

    //搜索用户事件
    searchX() {
      this.page = 1; //搜索第一页的数据
      this.post_user();
    },
    //分页插件

    //页容量变化事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val; //页容量赋值
      this.page = 1; //页码回到第一页
      this.post_user();
    },

    //页码变化事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.post_user();
    },

    //修改用户状态
    change(id) {
      change_user({ id }).then(res => {
        console.log("用户状态修改结果:", res);
        if (res.data.code == 200) {
          this.post_user({ page: this.page, limit: this.size });
          this.$message.success("状态更改成功");
        }
      });
    },
    //删除用户
    remove(id) {
      //判断如果当前删除的是当前页码的最后一个数据,删除完后就让页码返回上一页
      if (this.tableData.length == 1) {
        this.page--;
      }
      if (this.page == 0) {
        this.page = 1;
      }
      remove_user({ id }).then(res => {
        console.log("用户删除:", res);
        if (res.data.code == 200) {
          this.post_user(); //重新获取数据
          this.$message.success("删除成功");
        }
      });
    },
    //获取用户信息

    post_user() {
      get_user({
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
    //调用获取用户信息方法
    this.post_user();
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {
    addS,
    editS
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

.el-pagination {
  text-align: center;
  margin-top: 20px;
}

/* .el-card__body{
  
} */
</style>
