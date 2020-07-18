<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="['menu-wrapper', isCollapse? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="theOnlyChildren && !theOnlyChildren.children">
      <side-bar-item-link
        :to="getResolvePath(theOnlyChildren.path)"
        v-if="theOnlyChildren.meta"
      >
        <el-menu-item
          :index="getResolvePath(theOnlyChildren.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <svg-icon
            v-if="theOnlyChildren.meta.icon"
            :name="theOnlyChildren.meta.icon"
          ></svg-icon>
          <span
            v-if="theOnlyChildren.meta.title"
            slot="title"
          >{{theOnlyChildren.meta.title}}</span>
        </el-menu-item>
      </side-bar-item-link>
    </template>
    <el-submenu
      v-else
      :index="getResolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        ></svg-icon>
        <span
          v-if="item.meta&&item.meta.title"
          slot="title"
        >{{item.meta.title}}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :base-path="getResolvePath(item.path)"
          :is-first-level="false"
          class="nest-menu"
        ></sidebar-item>
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import SideBarItemLink from "./SideBarItemLink.vue";
import { isExternal } from "@/utils/validate";
import path from "path";
@Component({
  name: "SidebarItem",
  components: {
    SideBarItemLink
  }
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig;
  @Prop({ default: false }) private isCollapse!: boolean;
  @Prop({ default: true }) private isFirstLevel!: boolean;
  @Prop({ default: "" }) private basePath!: string;

  // 计算属性
  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter(
        item => !item.meta || !item.meta.hidden
      );
      return showingChildren.length;
    } else {
      return 0;
    }
  }
  get theOnlyChildren() {
    if (this.showingChildNumber > 1) {
      return null;
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }
    return { ...this.item };
  }
  getResolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    return path.resolve(this.basePath, routePath);
  }
}
</script>
<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}
.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}
// 收起菜单
.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;
      .el-tooltip {
        padding: 0 !important;
      }
    }
    .el-submenu {
      overflow: hidden;
      & > .el-submenu__title {
        padding: 0px !important;
        .el-submenu__icon-arrow {
          display: none;
        }
        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}
.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>