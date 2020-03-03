<template>
  <div class="question">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="学科" prop="subject">
          <!-- <el-select v-model="formInline.subject">
            <el-option
              :label="item.name"
              :value="item.rid"
              v-for="(item, index) in this.subjectlist"
              :key="index"
            ></el-option>
          </el-select> -->
          <subjectSelect v-model="formInline.subject"></subjectSelect>
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select v-model="formInline.step">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" prop="enterprise">
          <!-- <el-select v-model="formInline.enterprise">
            <el-option
              :label="item.name"
              :value="item.eid"
              v-for="(item, index) in this.enterpriselist"
              :key="index"
            ></el-option>
          </el-select> -->
          <enterpriseSelect v-model="formInline.enterprise" />
        </el-form-item>

        <el-form-item label="题型" prop="type">
          <el-select v-model="formInline.type">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="formInline.difficulty">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者" prop="username">
          <el-input class="inputUser" v-model="formInline.username"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" prop="create_date">
          <el-date-picker
            @change="okdate"
            value-format="yyyy-MM-dd"
            v-model="formInline.create_date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" prop="title">
          <el-input class="input1" v-model="formInline.title"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 上面表单结束 -->
    <!-- 下面的用户表单开始 -->
    <el-card class="box-card box2">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">
            <p v-html="scope.row.title"></p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="学科:阶段">
          <template slot-scope="scope">
            <!-- {{ scope.row.subject_name }}·
            <span v-if="scope.row.step == 1">初级</span>
            <span v-else-if="scope.row.step == 2">中级</span>
            <span v-else>高级</span> -->

            {{ scope.row | sub }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">单选</span>
            <span v-else-if="scope.row.type == 2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <!--三元表达式判断 -->
            {{ scope.row.status == 1 ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">
              禁用
            </el-button>
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
      ></el-pagination>
    </el-card>

    <queSon />
  </div>
</template>

<script>
//获取学科
// import { get_subject } from "@/api/subject.js";
// //获取企业
// import { get_enterprise } from "@/api/enterprise.js";

//获取题目
import { get_question } from "@/api/question.js";

import queSon from "./componets/questionSon";

export default {
  name: "question",
  props: {},
  //数据
  data() {
    return {
      page: 1, //页码
      size: 5, //页容量
      total: 0, //总条
      subjectlist: [],
      enterpriselist: [],
      formInline: {}, //表格数据
      tableData: [] //表格数据
    };
  },
  //方法
  methods: {
    //时间点击事件
    okdate() {
      console.log(this.formInline.create_date);
    },
    handleSizeChange() {
      //页容量点击事件
    },
    handleCurrentChange() {
      //页码点击事件
    },
    //获取题目
    post_question() {
      get_question({
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
  filters: {
    //学科阶段过滤器
    sub: function(val) {
      let str = "";
      if (val.step == 1) {
        str = "初级";
      } else if (val.step == 2) {
        str = "中级";
      } else {
        str = "高级";
      }
      return val.subject_name + " · " + str;
    }
  },
  //进入页面就执行的生命周期,可以访问dom
  created() {
    // get_subject().then(res => {
    //   console.log("学科数据:", res);
    //   this.subjectlist = res.data.data.items;
    // });

    // // 获取启用企业
    // get_enterprise({ status: 1 }).then(res => {
    //   console.log("企业数据:", res);
    //   this.enterpriselist = res.data.data.items;
    // });

    // get_question({ page: this.page, limit: this.size }).then(res => {
    //   console.log("题目列表", res);
    //   this.tableData = res.data.data.items;
    //   this.total = res.data.data.pagination.total;
    // });
    this.post_question();
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {},
  //子页面
  components: {
    queSon
  }
};
</script>

<style lang="less" scoped>
.question {
  .el-form--inline {
    // .el-form-item:not(:last-child) .el-form-item__content {
    //   width: 200px;
    // }

    .input1 {
      width: 500px;
    }
    .el-card__body:first-of-type {
      padding: 20px 0px;
    }

    // .el-form-item:last-of-type {
    //   margin-left: 320px;
    // }
    .inputUser {
      width: 217px;
    }
  }
  .box2 {
    margin-top: 20px !important;
    padding: 20px;
  }

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
