<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      :default-active="activePath"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :is-collapse="isCollapse"
      ></sidebar-item>
    </el-menu>

  </el-scrollbar>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import variables from "@/styles/_variables.scss";
import { AppModule } from "@/store/modules/app";
import SidebarItem from "./SideBarItem.vue";
@Component({
  name: "SideBar",
  components: {
    SidebarItem
  }
})
export default class extends Vue {
  // 计算属性
  get sidebar() {
    return AppModule.sidebar;
  }

  get isCollapse() {
    return !this.sidebar.opened;
  }

  get variables() {
    return variables;
  }
  /* eslint-disable */
  get routes() {
    return (this.$router as any).options.routes; //this.$route as any防止检验类型异常
  }

  get activePath() {
    return this.$route.fullPath;
  }

  // 侦听属性
}
</script>
<style lang="scss">
.sidebar-container {
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }
    &.is-horizontal {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>