<template>
  <div id="login">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in data.menuTab"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul>
      <!--表单 start-->
      <el-form
        :model="data.ruleForm"
        status-icon
        :rules="data.rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="data.ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="password"
            v-model="data.ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="10"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="data.model==='regsiter'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="data.ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="10"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10 ">
            <el-col :span="15">
              <el-input v-model="data.ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                class="block"
                type="success"
                @click="getSms()"
                :disabled="data.codeButtonStatus.status"
              >{{data.codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            :disabled="data.loginbtnStatus"
            class="login-btn block"
            type="danger"
            @click="submitForm('ruleForm')"
          >{{data.model==="login"?"登录":"注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  ValidateEmail,
  VaildatePass,
  ValidateVcode
} from "@/utils/validate.js";
export default {
  name: "login",
  setup (props, context) {
    const data = reactive({
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "regsiter" }
      ],
      codeButtonStatus: { status: false, text: "获取验证码" },
      model: "login",
      timer: null,
      loginbtnStatus: true,
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    })
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!ValidateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      data.ruleForm.password = stripscript(value);
      value = data.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!VaildatePass(value)) {
        callback(new Error("密码不能含有非法字符，长度在6-20之间"));
      } else {
        callback();
      }
    };
    //验证确认密码
    let validatePasswords = (rule, value, callback) => {
      if (data.model === "login") {
        callback();
      }
      //过滤后的密码
      data.ruleForm.passwords = stripscript(value);
      value = data.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != data.ruleForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    //验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!ValidateVcode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    //切换登录选项
    const toggleMenu = item => {
      data.menuTab.forEach(s => {
        s.current = false;
      });
      data.current = true;
      data.model = item.type;
      context.refs.ruleForm.resetFields(); //切换登录注册按钮重置表单
      data.codeButtonStatus.status = false;
      data.codeButtonStatus.text = "获取验证码";
      data.loginbtnStatus = true;
    };
    //更新验证码按钮状态
    const updateButtonStatus = prams => {
      data.codeButtonStatus.status = prams.status;
      data.codeButtonStatus.text = prams.text;
    };
    //点击验证码按钮事件
    const getSms = () => {
      if (data.ruleForm.username == "") {
        context.root.$message.error("邮箱不能为空");
        return false;
      }
      if (!ValidateEmail(data.ruleForm.username)) {
        context.root.$message.error("邮箱格式错误");
      }
      //修改获取验证码按钮状态
      updateButtonStatus({
        status: true,
        text: "发送中"
      });
      //调用获取验证码接口
      GetSms({
        username: data.ruleForm.username,
        module: data.model
      })
        .then(response => {
          let result = response.data;
          context.root.$message.success(result.message);
          //启用登录或注册按钮
          data.loginbtnStatus = false;
          //调定时器，验证码按钮倒计时
          countDown(60);
        })
        .catch(error => {
          //获取验证码失败 重置验证码按钮状态
          clearDown();
        });
    };
    //提交表单
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          data.model == "login"
            ? login({
              username: data.ruleForm.username,
              password: data.ruleForm.password,
              code: data.ruleForm.code
            })
            : Register({
              username: data.ruleForm.username,
              password: data.ruleForm.password,
              code: data.ruleForm.code,
              module: data.model
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    //登录
    const login = data => {
      context.root.$store
        .dispatch("app/Login", data)
        .then(response => {
          context.root.$message.success(response.data.message);
          clearDown();
          //页面跳转
          context.root.$router.push({
            name: "Console"
          });
        })
        .catch(error => { });
    };
    //注册
    const register = data => {
      Register(data)
        .then(response => {
          context.root.$message.success(response.data.message);
          toggleMenu(menuTab[0]);
          clearDown();
        })
        .catch(error => {
          console.log(error);
        });
    };
    //倒计时
    const countDown = number => {
      //防止多次触发
      if (data.timer) {
        clearInterval(data.timer);
      }
      let time = number;
      data.timer = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(data.timer); //清除定时器
          updateButtonStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          data.codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };
    //清除倒计时
    const clearDown = () => {
      updateButtonStatus({
        status: false,
        text: "获取验证码"
      });
      clearInterval(data.timer); //清除倒计时
    };
    //返回所有数据
    return {
      data,
      getSms,
      toggleMenu,
      submitForm
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  position: relative;
}
#login > #particles-js {
  width: 100vw;
  height: 100vh;
  background: black;
  position: fixed;
  top: 0;
  left: 0;
}
.login-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 330px;
  height: 480px;
  transform: translate(-165px, -240px);
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>