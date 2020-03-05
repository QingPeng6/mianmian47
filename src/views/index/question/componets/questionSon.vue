<template>
  <div>
    <el-dialog
      destroy-on-close
      class="boxque"
      fullscreen
      :title="isAdd ? '新增题目' : '编辑题目'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="queSon">
        <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
          <subjectSelect :fa="false" v-model="form.subject"></subjectSelect>
        </el-form-item>

        <el-form-item
          label="企业"
          prop="enterprise"
          :label-width="formLabelWidth"
        >
          <enterpriseSelect :fa="false" v-model="form.enterprise" />
        </el-form-item>

        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
          <el-select v-model="form.step">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
          <!-- <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader> -->
          <citySon v-model="form.city" />
        </el-form-item>

        <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="难度"
          prop="difficulty"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="xianxian">
          <el-divider></el-divider>
        </el-form-item>

        <el-form-item
          class="stbt"
          label="试题标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <myEdtior class="editor" v-model="form.title" />
        </el-form-item>

        <!-- 选 -->
        <el-form-item
          v-if="form.type == 1"
          label="单选"
          :label-width="formLabelWidth"
          prop="single_select_answer"
        >
          <el-radio-group v-model="form.single_select_answer">
            <selectSon
              v-for="(item, index) in form.select_options"
              :key="index"
              :label.sync="item.label"
              :txt.sync="item.text"
              :imgss.sync="item.image"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-else-if="form.type == 2"
          label="多选"
          :label-width="formLabelWidth"
          prop="multiple_select_answer"
        >
          <el-checkbox-group v-model="form.multiple_select_answer">
            <selectSon
              v-for="(item, index) in form.select_options"
              :key="index"
              :label.sync="item.label"
              :txt.sync="item.text"
              :imgss.sync="item.image"
              :duoX="false"
            />
            <!-- <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" v-else label="简答">
          <el-input type="textarea" v-model="form.short_answer"></el-input>
        </el-form-item>

        <el-form-item class="xianxian">
          <el-divider></el-divider>
        </el-form-item>

        <el-form-item class="VV" label="解析视频" :label-width="formLabelWidth">
          <el-upload
            v-model="form.video"
            class="avatar-uploader"
            :action="upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传mp4文件，且不超过2M
            </div>
          </el-upload>
          <video :src="videoURL" controls></video>
        </el-form-item>

        <el-form-item class="xianxian">
          <el-divider></el-divider>
        </el-form-item>

        <el-form-item
          class="stbt"
          label="答案解析"
          :label-width="formLabelWidth"
          prop="answer_analyze"
        >
          <myEdtior class="editor" v-model="form.answer_analyze" />
        </el-form-item>

        <el-form-item class="xianxian">
          <el-divider></el-divider>
        </el-form-item>

        <el-form-item
          class="xianxian"
          label="试题备注"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-input type="textarea" :rows="3" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearSON">取 消</el-button>
        <el-button type="primary" @click="addsucceed">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import citySon from "./citySon";
import myEdtior from "./myEdtior";
import selectSon from "./select";

import { add_question, edit_question } from "@/api/question.js";
// import { regionDataPlus } from "element-china-area-data";
export default {
  name: "queSon",
  props: {},
  //数据
  data() {
    return {
      isAdd: true, //判断点进来是新增还是编辑
      form: {
        type: 1,
        checkList: [],
        multiple_select_answer: [],
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      upload: process.env.VUE_APP_URL + "/question/upload",
      videoURL: "", //图片
      dialogFormVisible: false,
      formLabelWidth: "380px",
      // options: regionDataPlus
      rules: {
        subject: [{ required: true, message: "请输入", trigger: "blur" }],
        step: [{ required: true, message: "请输入", trigger: "blur" }],
        city: [{ required: true, message: "请输入", trigger: "blur" }],
        enterprise: [{ required: true, message: "请输入", trigger: "blur" }],
        difficulty: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请输入", trigger: "blur" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        single_select_answer: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  //方法
  methods: {
    //取消按钮的点击
    clearSON() {
      this.dialogFormVisible = false;
      console.log("123");
      this.form = {};
      this.$refs.queSon.resetFields(); //重置表单数据
    },
    //确定按钮点击
    addsucceed() {
      this.$refs.queSon.validate(v => {
        if (v) {
          if (this.isAdd) {
            add_question(this.form).then(res => {
              console.log("新增题目:", res);
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.dialogFormVisible = false;
                this.$parent.post_question();
                this.$refs.queSon.resetFields(); //重置表单数据
              }
            });
          } else {
            edit_question(this.form).then(res => {
              console.log("新增题目:", res);
              if (res.data.code == 200) {
                this.$message.success("修改成功");
                this.dialogFormVisible = false;
                this.$parent.post_question();
                this.$refs.queSon.resetFields(); //重置表单数据
              }
            });
          }
        } else {
          return false;
        }
      });
    },

    //视频上传
    handleAvatarSuccess(res, file) {
      this.videoURL = URL.createObjectURL(file.raw);
      console.log("上传视频返回:", res);
      this.form.video = process.env.VUE_APP_URL + res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  components: {
    citySon,
    myEdtior,
    selectSon
  }
};
</script>

<style lang="less">
.boxque {
  .el-dialog__footer {
    text-align: center;
    margin-left: 480px;
  }
  .el-form {
    margin-left: 100px;
    width: 840px;
    // height: 1000px;

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

    // .danX {

    // }
    .VV {
      .avatar-uploader {
        .el-upload {
          border: 0px;
        }
      }
    }
  }

  .el-select {
    width: 380px !important;
  }

  .el-form-item__label {
    padding-right: 41px;
  }

  .el-input__inner {
    width: 380px;
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
