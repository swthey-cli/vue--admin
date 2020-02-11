<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-warp">
            <div class="category">
              <h4>
                <svg-icon iconClass="minus" class="minus" style="color:#ccc"></svg-icon>新闻
                <div class="button_group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button_group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>国际</li>
                <li>数读</li>
                <li>军事</li>
                <li>航空</li>
                <li>无人机</li>
              </ul>
            </div>
            <div class="category">
              <h4>
                <svg-icon iconClass="minus" class="minus" style="color:#ccc"></svg-icon>新闻
              </h4>
              <ul>
                <li>国内</li>
                <li>国际</li>
                <li>数读</li>
                <li>军事</li>
                <li>航空</li>
                <li>无人机</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form :label-position="labelPosition" label-width="142px" class="form-wrap">
            <el-form-item label="一级分类名称:">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">确认</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "category",
  setup(props, context) {
    const labelPosition = ref("right");
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: ""
    });
    return {
      formLabelAlign,
      labelPosition
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category-warp {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    svg {
      position: absolute;
      left: 15px;
      top: 15px;
      background-color: #fff;
    }
  }

  li {
    position: relative;
    padding-left: 40px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;
    }
  }
  .button_group {
    position: absolute;
    z-index: 2;
    right: 11px;
    z-index: 2;
    top: -1px;
    button {
      font-size: 12px;
    }
  }
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100%+60px);
  margin: 30px 0 30px -30px;
  border:none;
  border-bottom: 1px solid #e9e9e9;
}
</style>