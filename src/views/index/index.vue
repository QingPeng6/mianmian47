//!这是主页的index.vue
<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="hed">
        <div class="left">
          <i
            class="icon my_icon"
            @click="isCollapse = !isCollapse"
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          ></i>
          <img src="./logo.png" class="imgLOGO" alt="" />
          <span>祥子的工作室</span>
        </div>
        <div class="right">
          <img :src="$store.state.userImg" alt="" class="imgUser" />
          <span class="wanshan">亲爱的{{ $store.state.userName }},你好</span>
          <el-button type="primary" size="small" @click="outUser"
            >退出</el-button
          >
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <!-- :collapse="isCollapse" 属性控制侧边栏的折叠 -->
        <el-menu
          router
          :collapse="isCollapse"
          default-active="/index/data"
          class="el-menu-vertical-demo"
        >
          <template v-for="(item, index) in this.children">
            <el-menu-item
              :key="index"
              :index="'/index/' + item.path"
              v-if="item.meta.roles.includes($store.state.role)"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
            <!-- <el-menu-item
              :key="index"
              :index="'/index/' + item.path"
              v-if="item.meta.roles.includes($store.state.role)"
            >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item> -->
          </template>

          <!-- <el-menu-item
            index="/index/user"
            v-if="['超级管理员', '管理员'].includes($store.state.role)"
          >
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item
            index="/index/question"
            v-if="
              ['超级管理员', '管理员', '老师', '学生'].includes(
                $store.state.role
              )
            "
          >
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item
            index="/index/enterprise"
            v-if="['超级管理员', '管理员', '老师'].includes($store.state.role)"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item
            index="/index/subject"
            v-if="
              ['超级管理员', '管理员', '老师', '学生'].includes(
                $store.state.role
              )
            "
          >
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { out_user } from "@/api/index.js";
import { getToken } from "@/utilis/token.js";
import { removeToken } from "@/utilis/token.js";
//导入children 用来渲染页面
import children from "@/router/children.js";
export default {
  props: {},
  //数据
  data() {
    return {
      children,
      // userImg: "", //用户头像图片
      // userName: "", //用户名
      isCollapse: false
    };
  },
  //方法
  methods: {
    //!退出用户登录
    outUser() {
      this.$confirm("此操作将退出用户登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //*点击确定后执行退出用户登录方法
          out_user().then(res => {
            console.log(res);
            if (res.data.code == 200) {
              //*执行删除token方法
              removeToken();
              this.$message({
                type: "success",
                message: "退出成功!"
              });
              //给vuex里面的用户数据清空
              this.$store.commit("changeName", "");
              this.$store.commit("changeImg", "");
              this.$router.push("/login"); //跳转登录页
            } else {
              this.$message.error("退出失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  //计算属性
  computed: {},
  //过滤器
  filters: {},
  //进入页面就执行的生命周期,可以访问dom
  created() {
    // get_user().then(res => {
    //   console.log("用户信息", res);
    //   //用户头像地址需要拼接
    //   this.userImg = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    //   this.userName = res.data.data.username;
    // });
  },
  //渲染页面后执行的生命周期,不能访问dom
  mounted() {},
  //侦听器
  watch: {},
  //!页面一打开就执行的函数
  beforeCreate() {
    //*判断如果不能获取到token 就弹出请先登录,并跳转到登录页
    if (!getToken()) {
      this.$message.error("请先登录");
      this.$router.push("/login");
    }
  },
  //子页面
  components: {}
};
</script>

<style lang="less" >
.my-container {
  height: 100%;
  //   .my-header {
  //     background-color: red;
  //   }
  //   .my-aside {
  //     background-color: green;
  //   }
  .my-main {
    background-color: rgb(140, 168, 179);
  }
}
.hed {
  display: flex;
  height: 100%;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    height: 100%;
    .icon {
      font-size: 30px;
      margin-right: 15px;
    }
    .my_icon {
      cursor: pointer !important;
    }
    .imgLOGO {
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    height: 100%;
    .wanshan {
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      margin-right: 38px;
      margin-left: 9px;
    }
    .imgUser {
      width: 43px;
      height: 43px;
      border-radius: 30%;
      overflow: hidden;
    }
  }
}
.el-menu-vertical-demo {
  border-right: 0px solid #000 !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
