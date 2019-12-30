<template>
  <div class="example-container">
    <div class="container-header">
      <div class="title">我的目标</div>
      <el-container class="dialog">
        <el-button type="primary" size="small" @click="dialogVisible = true">
          + 新建项目
        </el-button>
        <el-dialog :visible.sync="dialogVisible" title="新建项目">
          <!-- <repassword></repassword> -->
          <el-form>
            <el-form-item label="目标类型" :label-width="formLabelWidth" :required="true">
              <el-select placeholder="请选择目标类型">
                <el-option label="个人" value="person"></el-option>
                <el-option label="部门" value="department"></el-option>
                <el-option label="公司" value="company"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="目标周期" :label-width="formLabelWidth" :required="true">
              <el-select placeholder="请选择目标周期">
              </el-select>
            </el-form-item>
            <el-form-item label="目标名称" :label-width="formLabelWidth" :required="true">
              <el-input placeholder="请输入目标名称">
              </el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth" :required="true">
              <el-select placeholder="请选择负责人">
              </el-select>
            </el-form-item>
            <el-form-item label="关键结果" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="5">
              </el-input>
            </el-form-item>
            <el-form-item label="权重:">
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-container>
      <el-select size="small" v-model="value" style="width: 150px;"
      class="select" placeholder="可选择周期" @change="change()">
        <el-option v-for="item in options" :key="item.value"
        :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="container-context">
      <div class="info">
        <span class="vertical"></span>
        <span>基本信息</span>
      </div>
      <div class="progress-bar">
          <div v-for="(val, index) in object" :key="index" class=out-border>
            <el-progress class="set-progress" type="circle" :width=120
            :percentage="0"></el-progress>
            <div :class="style[index]">
                <div class="content">
                  <span class="val">{{val.val}}</span>
                  <span class="num">
                    {{val.number}}
                    <span class="sym">%</span>
                  </span>
                  <span class="mes">{{val.message}}</span>
              </div>
            </div>
          </div>
      </div>
      <div class="object">
        <div class="head">
          <div class="front">
            <span class="vertical"></span>
            <span>我的目标</span>
          </div>
          <div class="start_end">
            <button type="button" class="btnlink">
              <span>进行中</span>
            </button>
            <span>|</span>
            <button type="button" class="btnlink">
              <span>已结束</span>
            </button>
          </div>
        </div>
          <div class="table">
            <el-table style="width: 100%">
              <el-table-column prop="date" label="负责人">
              </el-table-column>
              <el-table-column prop="name" label="目标">
              </el-table-column>
              <el-table-column prop="address" sortable="false" label="最近更新">
              </el-table-column>
              <el-table-column prop="address" label="类型">
              </el-table-column>
              <el-table-column prop="address" label="进度">
              </el-table-column>
            </el-table>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
  data() {
    return {
      style: [
        's1',
        's2',
        's3',
      ],
      object: [
        {
          val: '完成度',
          number: '0',
          message: '我的',
        },
        {
          val: '完成度',
          number: '0',
          message: '部门',
        },
        {
          val: '完成度',
          number: '0',
          message: '公司',
        }],
      dialogVisible: false,
      options: [{
        value: '0',
        label: '全部',
      }],
      breadList: [],
      value: '',
      form: {
        name: '',
        region: '',
      },
      formLabelWidth: '120px',
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => { done() })
        .catch(() => {})
    },
    change() {
      // 下拉框数据是循环别的接口得来的，因为数据层次太多，render函数没有自动更新，
      // 需手动强制刷新所以我直接强制刷新了值，而forceUpdate就是重新render
      this.$forceUpdate()
    },
  },
  // 去除rules中需要动态校验的字段规则
  rules: {
    region: [
      { required: true, message: '请选择目标类型', trigger: 'blur' },
    ],
  },
  computed: {
    isHaveTo() {
      return this.ruleForm.region === '1'
    },
  },
}
</script>

<style lang="scss" scoped>
  .example-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f0f2f5;
  }
  .container-header {
    display: flex;
    border: 1px solid rgb(235, 237, 240);
    margin: 25px 25px 0px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    padding: 16px 34px;
    background-color: #fff;
  }
  .select{
    margin: 3px 100px 0px 10px;
  }
  .out-border{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
  }
  .content{
    display: flex;
    position: relative;
    flex-direction: column;
    margin-top: 23px;
    background: #fff;
    z-index: 3;
  }
  .set-progress{
    position: absolute;
    top: 40px;
    z-index: 0;
  }
  .val {
    color: rgb(100, 100, 100);
    display: block;
    font-size: 12px;
    margin: 10px 12px 14px 10px;
  }
  .num {
    font-size: 35px;
    margin-left: 15px;
  }
  .sym {
    font-size: 12px;
    margin-left: -6px;
  }
  .mes {
    width: 48px;
    line-height: 14px;
    margin: 5px 5px 10px 5px;
    padding: 0px 10px;
    font-size: 12px;
    border-radius: 10px;
  }
  .s1 {
    .num {
      color: rgb(138, 212, 81);
    }
    .sym {
      color: rgb(138, 212, 81);
    }
    .mes {
      border: 1px solid rgb(138, 212, 81);
      color: rgb(138, 212, 81);
    }
  }
  .s2 {
    .num {
      color: rgb(0, 199, 213);
    }
    .sym {
      color: rgb(0, 199, 213);
    }
    .mes {
      border: 1px solid rgb(0, 199, 213);
      color: rgb(0, 199, 213);
    }
  }
  .s3 {
    .num {
      color: rgb(59, 125, 247);
    }
    .sym {
      color: rgb(59, 125, 247);
    }
    .mes {
      border: 1px solid rgb(59, 125, 247);
      color: rgb(59, 125, 247);
    }
  }
  .title {
    color: rgba(0,0,0,.85);
    font-weight: 600;
    font-size: 20px;
    flex: 0 0 70%
  }
  .vertical {
    margin: 15px;
    border: 2px solid #00d4b3;
  }
  .progress-text {
    display: flex;
    flex-flow: column wrap;
  }
  .object{
    display: flex;
    flex-direction: column;
  }
  .head {
    display: flex;
  }
  .front {
    flex: 1;
  }
  .start_end {
    flex: 0 0 20%;
  }
  .btnlink {
    color: #1890ff;
    background-color: transparent;
    border-color: transparent;
  }
  .dialog{
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
  }
  .container-context {
    display: flex;
    flex-direction: column;
    flex-flow: column wrap;
    background-color: #fff;
    margin: 0px 25px;
    padding: 25px 12px;
  }
  .progress-bar {
    position: relative;
    display: flex;
    justify-content: space-around;
    min-height: 200px;
    margin: 20px;
  }
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
