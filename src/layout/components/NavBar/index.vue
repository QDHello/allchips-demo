<template>
  <div class="navbar">
    <Hamburger
      @toggleClick="toggleSidebar"
      :is-active="sidebar.opened"
      id="hamburger-container"
      class="hamburger-container"
    ></Hamburger>
    <Breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    ></Breadcrumb>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div
          class="avatar-wrapper"
          trigger="click"
        >
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/armour/vue-typescript-admin-template/"
          >
            <el-dropdown-item>
              Github
            </el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://armour.github.io/vue-typescript-admin-docs/"
          >
            <el-dropdown-item>
              Docs
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span
              style="display:block;"
              @click="logout"
            >LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hamburger from "@/components/Hamburger.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { AppModule } from "@/store/modules/app";
import { UserModule } from "@/store/modules/user";
@Component({
  name: "Navbar",
  components: {
    Hamburger,
    Breadcrumb
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }
  get avatar() {
    return UserModule.avator;
  }
  private toggleSidebar() {
    AppModule.ToggleSidebar(false);
  }
  private async logout() {
    await UserModule.Logout();
    console.log(this.$route, "---route");

    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>