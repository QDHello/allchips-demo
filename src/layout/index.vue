<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    >
    </div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <Navbar />
      <TagViews />
      <app-main></app-main>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { Sidebar, Navbar, AppMain, TagViews } from "./components";
import ResizeMixin from "./minxin/resize";
import { DeviceType, AppModule } from "../store/modules/app";
@Component({
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain,
    TagViews
  }
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    };
  }
  private handleClickOutside() {
    AppModule.CloseSidebar(false);
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}
.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}
.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>