<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-width="80"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          autofocus
          placeholder="用户名"
          type="text"
          autocomplete="on"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          :type="passwordType"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :name="passwordType=='password'?'eye-off':'eye-on'"></svg-icon>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-top:30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <div style="position:relative">
        <div class="tips">
          <span>username: admin</span>
          <span>password: any</span>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { isValidateUserName } from "../utils/validate";
import { Dictionary } from "vue-router/types/router";
import { Form as ElForm } from "element-ui";
import { Route } from "vue-router";
import { UserModule } from "../store/modules/user";
@Component({
  name: "login"
})
export default class extends Vue {
  private validateUserName = (
    rule: string,
    value: string,
    callback: Function
  ) => {
    if (!isValidateUserName(value)) {
      callback(new Error("请输入正确的用户名"));
    } else {
      callback();
    }
  };
  private validatePassword = (
    rule: string,
    value: string,
    callback: Function
  ) => {
    if (value.length < 6) {
      callback(new Error("密码不能小于6位"));
    } else {
      callback();
    }
  };
  private loginForm = {
    username: "",
    password: ""
  };
  private loginRules = {
    username: [
      { required: true, validator: this.validateUserName, trigger: "blur" }
    ],
    password: [
      { required: true, validator: this.validatePassword, trigger: "blur" }
    ]
  };
  private passwordType = "password";
  private loading = false;
  private redirect?: string; //重定向链接
  private otherQuery?: Dictionary<string>;
  @Watch("$route", { immediate: true }) //方法装饰器，方法声明之前，紧靠方法
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect; //Type 'string | string[]' is not assignable to type 'string'. Type 'string[]' is not assignable to type 'string'.所以要引入Dictionary
      this.otherQuery = this.getOtherQuery(query);
    }
  }
  private showPwd() {
    this.passwordType = this.passwordType == "password" ? "" : "password";
  }
  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur != "redirect") {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        await UserModule.Login(this.loginForm);
        setTimeout(() => {
          this.loading = false;
        }, 5.1 * 1000);
        this.$router.push({
          path: this.redirect || "/",
          query: this.otherQuery
        });
        this.loading = false;
      } else {
        return false;
      }
    });
  }
}
</script>
<style lang="scss">
//改变输入框光标的颜色
@supports (-webkit-mask: none) and (not (caret-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $loginCursorColor;
    }
  }
}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;
      // input文本框会记录之前填写过的信息，信息列表下拉框样式
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>