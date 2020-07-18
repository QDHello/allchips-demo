<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in breadcrumbs"
        :key="item.path"
      >
        <span v-if="item.redirect==='noredirect' || index===breadcrumbs.length-1">{{item.meta.title}}</span>
        <a
          @click.prevent="handleLink(item)"
          v-else
        >{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import pathToRegexp from "path-to-regexp";
import { Component, Watch, Vue } from "vue-property-decorator";
import { RouteRecord, Route } from "vue-router";
@Component({
  name: "Breadcrumb"
})
export default class extends Vue {
  private breadcrumbs: RouteRecord[] = [];

  @Watch("$route")
  private onRouteChange(route: Route) {
    if (route.path.startsWith("/redirect")) return;
    this.getBreadcrumbs();
  }
  created() {
    this.getBreadcrumbs();
  }
  private getBreadcrumbs() {
    let matched = this.$route.matched.filter(
      item => item.meta && item.meta.title
    );
    const first = matched[0];
    if (!this.isDashboard(first)) {
      matched = [
        { path: "/dashboard", meta: { title: "首页" } } as RouteRecord
      ].concat(matched);
    }
    this.breadcrumbs = matched.filter(
      item => !item.meta || !item.meta.title || item.meta.breadcrumb !== false
    );
  }
  private isDashboard(route: RouteRecord) {
    const name = route && route.meta && route.meta.title;
    return name === "首页";
  }
  private pathCompile(path: string) {
    // 拼接路由参数
    const { params } = this.$route;
    const toPath = pathToRegexp.compile(path);
    console.log(toPath);

    return toPath(params);
  }
  // eslint-disable-next-line
  private handleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>